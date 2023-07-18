import { ActionTypes } from "./constants";

export interface SetActivateAction {
  type: typeof ActionTypes.SET_ACTIVE_FOLDER;
  payload: any;
}

export const setActivedFolder = (id: number): SetActivateAction => ({
  type: ActionTypes.SET_ACTIVE_FOLDER,
  payload: id,
});
