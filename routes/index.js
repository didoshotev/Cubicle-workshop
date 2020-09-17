const { getAllCubes } = require('../controllers/CRUD-cube');

module.exports = (app) => {
	app.get('/', async (req, res) => {
		const cubes = await getAllCubes();
		res.render('index', {
			"title": 'Home | Cubicle',
			cubes
		});
	});

	app.get('/about', (req, res) => {
		res.render('about', {
			"title": 'About | Cubicle'
		});
	});
	app.use('*', (req, res) => {
		res.render('404', {
			"title": 'Error 404'
		});
	});
};