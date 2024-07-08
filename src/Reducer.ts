export enum ActionType {
  SET_TENANT = "SET_TENANT",
  GET_USER_SUCCESS = "GET_USER_SUCCESS",
  LOGOUT = "LOGOUT",
  SET_THEME = "SET_THEME",
  SET_APP_LOADING_FLAG = "SET_APP_LOADING_FLAG",
}

export type Action =
  | {
      type: ActionType.SET_TENANT;
      payload: any;
    }
  | {
      type: ActionType.GET_USER_SUCCESS;
      payload: any;
    }
  | {
      type: ActionType.SET_THEME;
      payload: any;
    }
  | {
      type: ActionType.SET_APP_LOADING_FLAG;
      payload: any;
    };

export const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case ActionType.SET_APP_LOADING_FLAG:
      return {
        ...state,
        app_loading: action.payload,
      };
    case ActionType.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case ActionType.SET_THEME:
      return {
        ...state,
        customTheme: action.payload,
      };
    case ActionType.SET_TENANT:
      return {
        ...state,
        tenant: action.payload,
      };
    default:
      return state;
  }
};
