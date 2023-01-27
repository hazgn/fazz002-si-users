const express = require('express');
const router = express.Router();

const response = require('../helpers/response');
const validate = require('../middlewares/validate');
const controller = require('../controllers');

router.get('/', (req, res) => {
  return response.success(res, 200, {
    message: 'Wellcome FAZZ002 - Users',
  });
});
router.post('/', validate, controller.createUser);
router.get('/users', controller.listUser);
router.patch('/:id', validate, controller.updateUser);

module.exports = router;
