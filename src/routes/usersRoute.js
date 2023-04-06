const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/:page', usersController.getUsers);

router.get('/u/:id', usersController.getUser);

router.post('/register', usersController.postUser);
router.post('/login', usersController.login);
router.post('/logout', usersController.logout);

router.put('/:id', usersController.putUser);
router.delete('/:id', usersController.deleteUser);




module.exports = router;
