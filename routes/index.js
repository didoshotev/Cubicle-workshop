const { getAllCubes } = require('../controllers/CRUD-cube');
const { getUserStatus } = require('../controllers/user');

module.exports = (app) => {
	app.get('/', getUserStatus, async (req, res) => {
		const cubes = await getAllCubes();
		res.render('index', {
			"title": 'Home | Cubicle',
			cubes,
			isLoggedIn: req.isLoggedIn
		});
	});

	app.get('/about', getUserStatus, (req, res) => {
		res.render('about', {
			"title": 'About | Cubicle',
			isLoggedIn: req.isLoggedIn
		});
	});
	app.use('*', (req, res) => {
		res.render('404', {
			"title": 'Error 404'
		});
	});
};