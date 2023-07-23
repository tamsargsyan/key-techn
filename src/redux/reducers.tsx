import { ActionTypes } from "./constants";
import { SetActivateAction } from "./actions";
import { FolderProps, initialFolders } from "../data";

export interface AppState {
  folders: FolderProps[];
  folder: any;
  password: any;
  addFolderState: boolean;
  addPassState: boolean;
}

const initialState: AppState = {
  folders: initialFolders,
  folder: initialFolders[0],
  password: null,
  addFolderState: false,
  addPassState: false,
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
    case ActionTypes.REMOVE_FOLDER:
      return {
        ...state,
        folders: state.folders.filter(folder => folder.id !== action.payload),
      };
    case ActionTypes.SET_ADD_PASS:
      return {
        ...state,
        addPassState: action.payload,
      };
    case ActionTypes.ADD_PASS:
      const passId =
        state.folders[state.folders.length - 1].passwords.length > 0
          ? state.folders[state.folders.length - 1].passwords[
              state.folders[state.folders.length - 1].passwords.length - 1
            ].id + 1
          : 1;
      const values = action.payload;
      const newPasswordItem = {
        id: passId,
        passName: values[0],
        pass: values[1],
        login: values[2],
        url: values[3],
        isOpen: false,
      };
      const activeFolderIndex = state.folders.findIndex(
        folder => folder === state.folder
      );
      const updatedFolders = [...state.folders];
      updatedFolders[activeFolderIndex].passwords.push(newPasswordItem);
      return {
        ...state,
        folders: updatedFolders,
      };
    case ActionTypes.REMOVE_PASS:
      const removedPasswords = state.folders.map(folder => {
        if (folder.id === state.folder?.id) {
          return {
            ...folder,
            passwords: folder.passwords.filter(
              pass => pass.id !== action.payload
            ),
          };
        } else {
          return folder;
        }
      });
      return {
        ...state,
        folders: removedPasswords,
      };
    default:
      return state;
  }
};

export default reducer;
