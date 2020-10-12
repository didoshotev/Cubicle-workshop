const env = process.env.NODE_ENV || 'development';

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config')[env];


const generateToken = (data) => {
    const token = jwt.sign(data, config.privateKey);
    return token;
};

const saveUser = async (req, res) => {
    let { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
        username,
        password: hashedPassword
    });
    const userObject = await user.save();

    const token = generateToken({
        userID: userObject._id,
        username: userObject.username,
    });
    res.cookie('aid', token);

    return true
};
const verifyUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userObject = await User.findOne({ username })
        if (!userObject) {
            return {
                error: true,
                message: 'There is no such user'
            }
        }
        const status = await bcrypt.compare(password, userObject.password)
        if (status) {
            const token = generateToken({
                userID: userObject._id,
                username: userObject.username,
            })
            res.cookie('aid', token);
        }
        return {
            error: !status,
            message: status || 'Wrong password'
        }
    } catch (err) {
        return {
            error: true,
            message: 'There is no such user',
            status
        }
    }

};

const authAccess = (req, res, next) => {
    const token = req.cookies['aid'];
    if (!token) {
        return res.redirect('/');
    }

    try {
        jwt.verify(token, config.privateKey);
        next()
    } catch (err) {
        res.redirect('/');
    };
};

const getUserStatus = (req, res, next) => {
    const token = req.cookies['aid'];
    if (!token) {
        req.isLoggedIn = false;
    };

    try {
        jwt.verify(token, config.privateKey);
        req.isLoggedIn = true;
    } catch (err) {
        req.isLoggedIn = false;
    };
    next();
};

const authAccessJSON = (req, res, next) => {
    const token = req.cookies['aid'];
    if (!token) {
        return res.json({
            error: 'Not Authenticated!'
        })
    }

    try {
        const decodedObject = jwt.verify(token, config.privateKey);
        next()
    } catch (err) {
        return res.json({
            error: 'Not Authenticated!'
        })
    };
}

const guestAccess = (req, res, next) => {
    const token = req.cookies['aid'];
    if (token) {
        return res.redirect('/')
    }
    next();
};
module.exports = {
    saveUser,
    authAccess,
    verifyUser,
    getUserStatus,
    authAccessJSON,
    guestAccess
};