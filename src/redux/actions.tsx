import { ActionTypes } from "./constants";

export interface SetCounterAction {
  type: typeof ActionTypes.SET_COUNTER;
  payload: number;
}

export const setCounter = (value: number): SetCounterAction => ({
  type: ActionTypes.SET_COUNTER,
  payload: value,
});
