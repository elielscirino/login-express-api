const Users = require('../models/Users');

module.exports = {
    getUsers: async (req, res) => {
        Users.findAndCountAll({
            limit: 10,
            offset: 0
        }).then(users => {
            res.send(users.rows);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });            
    },
    getUser: async (req, res) => {
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
            Users.create(req.body)
        .then(user => {
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
    }
};
