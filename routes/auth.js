const User = require('../models/user');
const userController = require('../controllers/user');
const { static } = require('express');

module.exports = (app) => {
    app.get('/login', (req, res) => {
        res.render('loginPage', {
            "title": 'Login | Cubicle',
        })
    });
    app.get('/register', (req, res) => {
        res.render('registerPage', {
            "title": 'Register | Cubicle',
        })
    })

    app.post('/register', async (req, res) => {
        const status = await userController.saveUser(req, res);
        if(status === true){
            res.redirect('/')
        }
       
    })
};