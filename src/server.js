require('dotenv').config({path: '.env'});
const express = require('express');

const usersRoute = require('./routes/usersRoute');

const server = express();
server.use(express.urlencoded({ extended: false }));

server.use('/users', usersRoute);

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});