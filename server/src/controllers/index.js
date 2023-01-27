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

module.exports = {
  createUser,
  listUser,
  updateUser,
};
