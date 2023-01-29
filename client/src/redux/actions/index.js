import { getListUser, getUserDetail } from "../../modules/utils/users";

export const listUserAction = (params) => {
  return {
    type: "USER_LIST",
    payload: getListUser(params),
  };
};

export const userDetailAction = (id) => {
  return {
    type: "USER_DETAIL",
    payload: getUserDetail(id),
  };
};
