import axios from "axios";
const baseUrl = import.meta.env.VITE_API;

export const createUsers = (body) => {
  return axios.post(`${baseUrl}`, body);
};

export const getListUser = (params) => {
  const { search, by, order, limit, page } = params;
  return axios.get(
    // `${baseUrl}/users?search=${search}&by=${by}&order=${order}&limit=${limit}&page=${page}` change to all users
    `${baseUrl}/users?search=${search}&by=${by}&order=${order}`
  );
};