import { combineReducers } from "redux";
import { ActionType } from "redux-promise-middleware";

const users = "USER_LIST";
const userDetail = "USER_DETAIL";

const { Pending, Fulfilled, Rejected } = ActionType;

export default combineReducers({
  userList: (
    prevState = {
      userListData: [],
      meta: {},
      isError: false,
      errorMessage: "",
    },
    actions
  ) => {
    switch (actions.type) {
      case users.concat("_", Pending):
        return {
          ...prevState,
          isError: false,
        };

      case users.concat("_", Fulfilled):
        return {
          ...prevState,
          userListData: actions.payload.data.result.data,
          meta: actions.payload.data.result.meta,
          isError: false,
        };

      case users.concat("_", Rejected):
        return {
          ...prevState,
          isError: true,
          errorMessage: "Internal Server Error!",
        };

      default:
        return prevState;
    }
  },
  userDetail: (
    prevState = {
      userData: {},
      isError: false,
      errorMessage: "",
    },
    actions
  ) => {
    switch (actions.type) {
      case userDetail.concat("_", Pending):
        return {
          ...prevState,
          isError: false,
        };

      case userDetail.concat("_", Fulfilled):
        return {
          ...prevState,
          userData: actions.payload.data.result,
          isError: false,
        };

      case userDetail.concat("_", Rejected):
        return {
          ...prevState,
          isError: true,
          errorMessage: "Internal Server Error!",
        };

      default:
        return prevState;
    }
  },
});
