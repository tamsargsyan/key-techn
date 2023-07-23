import { ActionTypes } from "./constants";
import { SetActivateAction } from "./actions";
import { FolderProps, initialFolders } from "../data";

export interface AppState {
  folders: FolderProps[];
  folder: any;
  password: any;
  addFolderState: boolean;
}

const initialState: AppState = {
  folders: initialFolders,
  folder: initialFolders[0],
  password: null,
  addFolderState: false,
};

const reducer = (state = initialState, action: SetActivateAction): AppState => {
  switch (action.type) {
    case ActionTypes.SET_ACTIVE_FOLDER:
      const id = action.payload;
      const activatedFolder = state.folders.find(folder => folder.id === id);
      return {
        ...state,
        folder: activatedFolder,
      };
    case ActionTypes.SET_ACTIVE_PASSWORD:
      return {
        ...state,
        password: state.folder?.passwords?.find(
          (pass: any) => pass.id === action.payload
        ),
      };
    case ActionTypes.SET_ADD_FOLDER:
      return {
        ...state,
        addFolderState: action.payload,
      };
    case ActionTypes.ADD_FOLDER:
      const lastFolderId =
        state.folders.length > 0
          ? state.folders[state.folders.length - 1].id
          : 0;
      const newFolder = {
        id: lastFolderId + 1,
        name: action.payload,
        isOpen: false,
        passwords: [],
      };
      return {
        ...state,
        folders: [...state.folders, newFolder],
      };
    default:
      return state;
  }
};

export default reducer;
