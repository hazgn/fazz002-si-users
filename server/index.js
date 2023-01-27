require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const server = express();
const logger = morgan(
  ':method :url :status :res[content-length] - :response-time ms'
);

const router = require('./src/routes');

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server is connected on port ${port}`);
});

server.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'UPDATE', 'DELETE', 'OPTIONS'],
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(logger);
server.use(router);
