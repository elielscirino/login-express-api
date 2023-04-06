require('dotenv').config({path: '.env'});
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const connection = require('./dbConnection');


const server = express();
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());

const sessionStore = new SequelizeStore({
    db: connection,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000
});

server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

server.use('/users', require('./routes/usersRoute'));

const port = process.env.PORT;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
