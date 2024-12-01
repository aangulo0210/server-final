const express = require('express');

const User = require('../models/User');

const { register, login } = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const { getAllUsers, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get('/getUsers', verifyToken, isAdmin, getAllUsers)
router.post('/user/create', verifyToken, isAdmin, register)
router.put('/user/update/:id', verifyToken, isAdmin, updateUser)
router.delete('/user/delete/:id', verifyToken, isAdmin, deleteUser)


module.exports = router;