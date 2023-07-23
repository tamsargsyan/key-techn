import { ActionTypes } from "./constants";

export interface SetActivateAction {
  type: typeof ActionTypes.SET_ACTIVE_FOLDER;
  payload: any;
}

export const setActivedFolder = (
  id: number | undefined
): SetActivateAction => ({
  type: ActionTypes.SET_ACTIVE_FOLDER,
  payload: id,
});
export const setActivePassword = (
  id: number | undefined
): SetActivateAction => ({
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
export const removeFolder = (id: number): SetActivateAction => ({
  type: ActionTypes.REMOVE_FOLDER,
  payload: id,
});
export const setAddPass = (val: boolean): SetActivateAction => ({
  type: ActionTypes.SET_ADD_PASS,
  payload: val,
});
export const addPass = (arr: string[]): SetActivateAction => ({
  type: ActionTypes.ADD_PASS,
  payload: arr,
});
export const removePass = (id: number): SetActivateAction => ({
  type: ActionTypes.REMOVE_PASS,
  payload: id,
});
