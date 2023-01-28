import { combineReducers } from "redux";
import { ActionType } from "redux-promise-middleware";

const initialState = {
  userListData: [],
  meta: {},
  isError: false,
  errorMessage: "",
};

const users = "USER_LIST";

export default combineReducers({
  userList: (prevState = initialState, actions) => {
    const { Pending, Fulfilled, Rejected } = ActionType;

    switch (actions.type) {
      case users.concat("_", Pending):
        console.log("pending");
        return {
          ...prevState,
          isError: false,
        };

      case users.concat("_", Fulfilled):
        console.log("success", actions.payload.data.result.data);
        return {
          ...prevState,
          userListData: actions.payload.data.result.data,
          meta: actions.payload.data.result.meta,
          isError: false,
        };

      case users.concat("_", Rejected):
        console.log("gagal");
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
