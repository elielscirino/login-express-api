const Users = require('../models/Users');
const bcrypt = require('bcrypt');

module.exports = {
    getUsers: async (req, res) => {
        const page = req.params.page || 0;
        const limit = 5;
        Users.findAndCountAll({
            limit,
            offset: page * limit
        }).then(users => {
            res.send(users.rows);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });            
    },
    getUser: async (req, res) => {
        console.log("AQUI:", req.params.id);
        Users.findByPk(req.params.id)
            .then(user => {
                res.send(user);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving users."
                });
            });            
    },
    postUser: async (req, res) => {
        if (req.body.email && req.body.password) {
            Users.create({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            }).then(user => {
                res.send(user);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving users."
                });
            });  
        } else {
            res.status(500).send({
                message: "Email and password are required."
            });
        }
    },
    putUser: async (req, res) => {
        Users.update(req.body, {
            where: { id: req.params.id }
        })
            .then(user => {
                res.send(user);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving users."
                });
            });            
    },
    deleteUser: async (req, res) => {
        const user = await Users.findByPk(req.params.id);
        if (!user) {
            res.status(404).send({
                message: "User not found."
            });
        } else {
            Users.destroy({
                where: { id: req.params.id }
            })
                .then(user => {
                    res.status(204).send("User deleted.");
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving users."
                    });
                });  
        }        
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        if (email && password) {
            const user = await Users.findOne({ where: { email } });
            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    req.session.user = {
                        email: user.email,
                        password: user.password
                    };
                    res.status(204).send();
                } else {
                    res.status(401).send({
                        message: "Invalid email or password."
                    });
                }
            } else {
                res.status(401).send({
                    message: "Invalid email or password."
                });
            }
        } else {
            res.status(401).send({
                message: "Email and password are required."
            });
        }
    },
    logout: async (req, res) => {
        req.session.destroy();
        res.status(204).send();
    }
};
