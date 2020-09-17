const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = 'DEFFECT'

const saveUser = async (req, res) => {
    let { username, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        username,
        password: hashedPassword
    });

    const userObject = await user.save();

    const token = jwt.sign({
        username: userObject.username,
        userID: userObject._id,
    }, privateKey);

    res.cookie('aid', token);
    return true
};

module.exports = {
    saveUser,
};