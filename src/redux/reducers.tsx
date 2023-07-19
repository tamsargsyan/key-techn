import { ActionTypes } from "./constants";
import { SetActivateAction } from "./actions";
import { initialFolders } from "../data";

interface AppState {
  folder: any;
  password: any;
}

const initialState: AppState = {
  folder: initialFolders[0],
  password: null,
};

const reducer = (state = initialState, action: SetActivateAction): AppState => {
  switch (action.type) {
    case ActionTypes.SET_ACTIVE_FOLDER:
      const id = action.payload;
      const activatedFolder = initialFolders.find(folder => folder.id === id);
      return {
        ...state,
        folder: activatedFolder,
      };
    case ActionTypes.SET_ACTIVE_PASSWORD:
      return {
        ...state,
        password: state.folder.passwords.find(
          (pass: any) => pass.id === action.payload
        ),
      };
    default:
      return state;
  }
};

export default reducer;
