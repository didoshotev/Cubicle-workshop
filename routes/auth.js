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
};