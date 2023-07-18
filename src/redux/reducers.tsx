// src/redux/reducers.ts

import { ActionTypes } from "./constants";
import { SetCounterAction } from "./actions";

interface AppState {
  counter: number;
}

const initialState: AppState = {
  counter: 0,
};

const reducer = (state = initialState, action: SetCounterAction): AppState => {
  switch (action.type) {
    case ActionTypes.SET_COUNTER:
      return {
        ...state,
        counter: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
