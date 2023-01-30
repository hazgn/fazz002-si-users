const response = require('../helpers/response');
const models = require('../models');

const createUser = (req, res) => {
  const { body } = req;
  models
    .createUser(body)
    .then(({ status, result }) => {
      return response.success(res, status, result);
    })
    .catch(({ status, err }) => {
      return response.error(res, status, err);
    });
};

const listUser = (req, res) => {
  const { query } = req;
  models
    .listUser(query)
    .then(({ status, result }) => {
      return response.success(res, status, result);
    })
    .catch(({ status, err }) => {
      return response.error(res, status, err);
    });
};

const userDetail = (req, res) => {
  const { params } = req;
  models
    .userDetail(params.id)
    .then(({ status, result }) => {
      return response.success(res, status, result);
    })
    .catch(({ status, err }) => {
      return response.error(res, status, err);
    });
};

const updateUser = (req, res) => {
  const { params, body } = req;
  const { id } = params;
  models
    .updateUser(id, body)
    .then(({ status, result }) => {
      return response.success(res, status, result);
    })
    .catch(({ status, err }) => {
      return response.error(res, status, err);
    });
};

const deleteUserById = (req, res) => {
  const { id } = req.params;
  models
    .deleteUserById(id)
    .then(({ status, result }) => {
      return response.success(res, status, result);
    })
    .catch(({ status, err }) => {
      return response.error(res, status, err);
    });
};

const deleteMultiple = (req, res) => {
  const { body } = req;

  models
    .deleteMultiple(body)
    .then(({ status, result }) => {
      return response.success(res, status, result);
    })
    .catch(({ status, err }) => {
      return response.error(res, status, err);
    });
};

module.exports = {
  createUser,
  listUser,
  userDetail,
  updateUser,
  deleteUserById,
  deleteMultiple,
};
