const userController = require('../controllers/user');
const { verifyUser } = require('../controllers/user');

module.exports = (app) => {
    app.get('/login', (req, res) => {
        res.render('loginPage', {
            "title": 'Login | Cubicle',
        })
    })
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

    app.post('/login', async (req, res) => {
       const result = await verifyUser(req, res);
       if ( result ){ 
        res.redirect('/')
       } else {
           res.redirect('/login');
       }
    })

    app.get('/logout', (req, res) => {
        res.clearCookie('aid', '');
        res.redirect('/');
    });
};