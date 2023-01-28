import { getListUser } from "../../modules/utils/users";

export const listUserAction = (params) => {
  return {
    type: "USER_LIST",
    payload: getListUser(params),
  };
};
