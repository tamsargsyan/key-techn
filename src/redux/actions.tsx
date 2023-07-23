import { ActionTypes } from "./constants";

export interface SetActivateAction {
  type: typeof ActionTypes.SET_ACTIVE_FOLDER;
  payload: any;
}

export const setActivedFolder = (id: number): SetActivateAction => ({
  type: ActionTypes.SET_ACTIVE_FOLDER,
  payload: id,
});
export const setActivePassword = (id: number | null): SetActivateAction => ({
  type: ActionTypes.SET_ACTIVE_PASSWORD,
  payload: id,
});
export const setAddFolder = (val: boolean): SetActivateAction => ({
  type: ActionTypes.SET_ADD_FOLDER,
  payload: val,
});

export const addFolder = (name: string): SetActivateAction => ({
  type: ActionTypes.ADD_FOLDER,
  payload: name,
});
