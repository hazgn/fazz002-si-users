const response = require('../helpers/response');

// module.exports = (arrays) => {
//   return (req, res, next) => {
//     const { body } = req;
//     const validateArr = arrays;
//     const bodyProperty = Object.keys(body);
//     const isBodyValid =
//       validateArr.filter((property) => !bodyProperty.includes(property))
//         .length == 0
//         ? true
//         : false;
//     if (!isBodyValid) return response.error(res, 400, 'Invalid Body');
//     next();
//   };
// };

module.exports = (req, res, next) => {
  const { body } = req;
  const validateBody = ['fullname', 'email'];

  const bodyProperty = Object.keys(body);
  const isBodyValid =
    validateBody.filter((property) => !bodyProperty.includes(property))
      .length == 0
      ? true
      : false;
  if (!isBodyValid) return response.error(res, 400, 'Invalid Body');
  next();
};
