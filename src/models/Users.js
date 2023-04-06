const Sequelize = require('sequelize');
const db = require('../dbConnection');

const Users = db.define('users', {
    id:
    {
    	type: Sequelize.UUID,
    	defaultValue: Sequelize.UUIDV4,
    	allowNull: false,
    	primaryKey: true
    },
    email:
    {
    	type: Sequelize.STRING,
    	allowNull: false,
    	unique: true,
    	validate: {
    		isEmail: true,
    		notEmpty: true
    	}
    },
    password:
    {
    	type: Sequelize.STRING,
    	allowNull: false,
    	validate: {
    		notEmpty: true
    	}
    }
});

module.exports = Users;
