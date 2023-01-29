const db = require('../config/db');
const mysql = require('mysql2');

const createUser = (body) => {
  const { email, fullname } = body;
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return new Promise((resolve, reject) => {
    if (!email || !fullname)
      reject({ status: 401, err: 'Need input fullname & email!' });

    if (!emailPattern.test(email))
      reject({ status: 400, err: 'Format Email Invalid!' });

    const checkEmail = `SELECT * FROM users WHERE email = ?`;

    db.query(checkEmail, [email], (err, result) => {
      if (err) reject({ status: 500, err });

      if (result.length > 0)
        return reject({ status: 400, err: 'Email is Already exist!' });

      const sqlQuery = `INSERT INTO users SET ?`;

      body = {
        ...body,
        created_at: new Date(),
      };

      db.query(sqlQuery, [body], (err, result) => {
        if (err) reject({ status: 500, err });

        resolve({
          status: 200,
          result: {
            message: 'Success Create Users',
            id: result.insertId,
            fullname: fullname,
            email: email,
          },
        });
      });
    });
  });
};

const listUser = (query) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = ` SELECT * FROM users `;
    let countQuery = ' SELECT COUNT(*) AS "count" FROM users ';

    const statment = [];

    if (query.search) {
      sqlQuery += ` WHERE fullname LIKE '%${query.search}%' OR email LIKE '%${query.search}%' `;
      countQuery += ` WHERE fullname LIKE '%${query.search}%' OR email LIKE '%${query.search}%' `;
    }

    // const order = query.order;
    const order = query.order;
    let orderBy = '';
    if (query.by && query.by.toLowerCase() == 'id') orderBy = ' id ';
    if (query.by && query.by.toLowerCase() == 'name') orderBy = ' fullname ';
    if (query.by && query.by.toLowerCase() == 'date') orderBy = ' created_at ';

    if (order && orderBy) {
      sqlQuery += ' ORDER BY ? ? ';
      statment.push(mysql.raw(orderBy), mysql.raw(order));
    }

    const page = parseInt(query.page);
    const limit = parseInt(query.limit);

    if (query.limit && !query.page) {
      sqlQuery += ' LIMIT ? ';
      statment.push(limit);
    }

    if (query.limit && query.page) {
      sqlQuery += ' LIMIT ? OFFSET ? ';

      statment.push(limit, (page - 1) * limit);
    }
    db.query(countQuery, (err, result) => {
      if (err) return reject({ status: 500, err });

      const count = result[0].count;
      const newCount = count - page;
      const totalPage = Math.ceil(count / limit);

      let meta = {
        next:
          page >= totalPage
            ? null
            : `${process.env.URL_API}/users?search=${query.search}&by=${
                query.by
              }&order=${query.order}&limit=${query.limit}&page=${page + 1}`,
        prev:
          page == 1 || newCount < 0
            ? null
            : `${process.env.URL_API}/users?search=${query.search}&by=${
                query.by
              }&order=${query.order}&limit=${query.limit}&page=${page - 1}`,
        limit: limit,
        page: page,
        totalPage: totalPage,
        pageRemaining:
          page === 1 && newCount < 0
            ? null
            : count < limit
            ? null
            : newCount <= 0
            ? null
            : Math.ceil(newCount / limit),
        totalData: newCount < 0 ? null : count,
        totalRemainingData:
          page == 1 && newCount < 0
            ? null
            : count < limit
            ? null
            : newCount <= 0
            ? null
            : newCount,
      };

      db.query(sqlQuery, statment, (err, result) => {
        if (err) reject({ status: 500, err });

        resolve({ status: 200, result: { data: result, meta } });
      });
    });
  });
};

const userDetail = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM users WHERE id = ?`;
    db.query(sqlQuery, [id], (err, result) => {
      if (err) reject({ status: 500, err });

      if (result.length <= 0)
        return reject({ status: 400, err: 'User Not Found!' });

      resolve({
        status: 200,
        result: {
          id: result[0].id,
          fullname: result[0].fullname,
          email: result[0].email,
          created_at: result[0].created_at,
        },
      });
    });
  });
};

const updateUser = (id) => {
  return new Promise((resolve, reject) => {});
};

module.exports = {
  createUser,
  listUser,
  userDetail,
  updateUser,
};
