import { ActionTypes } from "./constants";
import { SetActivateAction } from "./actions";
import { initialFolders } from "../data";

interface AppState {
  folder: any;
}

const initialState: AppState = {
  folder: initialFolders[0],
};

const reducer = (state = initialState, action: SetActivateAction): AppState => {
  switch (action.type) {
    case ActionTypes.SET_ACTIVE_FOLDER:
      const id = action.payload;
      console.log(id);
      const activatedFolder = initialFolders.find(folder => folder.id === id);
      return {
        ...state,
        folder: activatedFolder,
      };
    default:
      return state;
  }
};

export default reducer;
