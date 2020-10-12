const User = require('../models/user');
const userController = require('../controllers/user');
const { verifyUser, guestAccess, getUserStatus } = require('../controllers/user');

module.exports = (app) => {
    app.get('/login', guestAccess, getUserStatus, (req, res) => {
        const error = req.query.error ? 'Username or password is invalid! ' : null;

        res.render('loginPage', {
            "title": 'Login | Cubicle',
            isLoggedIn: req.isLoggedIn,
            error
        })
    })
    app.get('/register', guestAccess, getUserStatus, (req, res) => {
        const error = req.query.error ? 'Username or password is invalid! ' : null;

        res.render('registerPage', {
            "title": 'Register | Cubicle',
            error
        })
    })

    app.post('/register', async (req, res) => {
        const { username, password, repeatPassword } = req.body;
        const regex = /^[A-Za-z0-9]+$/gm

        try {
            if (!username.match(regex)) {
                throw new TypeError('Not valid characters!');
            } else if (username.length < 5) {
                throw new TypeError('Password too short');
            } else if (!password.match(regex)) {
                throw new TypeError('Not valid characters!');
            } else if (password.length < 8) {
                throw new TypeError('Password too short!');
            } else if (password !== repeatPassword) {
                throw new TypeError('Passwords do not match!');
            }
        } catch (err) {
            res.status(400);
            res.redirect('/register?error=true');
            return
        };
        const status = await userController.saveUser(req, res);
        if (status === true) {
            res.redirect('/')
        }

    })

    app.post('/login', async (req, res) => {
        const { error } = await verifyUser(req, res);
        if (error) {
            res.redirect('/login?error=true')
        } else {
            res.redirect('/');
        }
    })
    app.get('/logout', (req, res) => {
        res.clearCookie('aid');
        res.redirect('/');
    });
};