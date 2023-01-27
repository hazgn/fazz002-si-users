const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.UNAME,
  password: process.env.PASS,
  database: process.env.DB,
});

db.connect((err) => {
  if (err) return console.log(err);
  return console.log('Database is Connected');
});

module.exports = db;
