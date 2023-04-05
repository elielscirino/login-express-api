require('dotenv').config({path: '.env'});
const Sequelize = require('sequelize');

const connection = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

const testAndSync = async () => {
    try {
        await connection.authenticate();
        console.log('Connection to database successful!');
        await connection.sync();
        console.log('Database synced!');
    } catch (err) {
        console.error('Unable to connect to database:', err);
    }
};

testAndSync();
module.exports = connection;