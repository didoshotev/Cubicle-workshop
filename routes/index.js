const { createCube, getAllCubes, getOne } = require('../controllers/CRUD-cube');

module.exports = (app) => {
	app.get('/', async (req, res) => {
		const cubes = await getAllCubes();
		res.render('index', {
			"title": 'Home | Cubicle',
			cubes
		});
	});
	app.post('/create', (req, res) => {
		const {
			name,
			description,
			imageUrl,
			difficultyLevel,
		} = req.body;
		if (!name) {
			alert('Name Field is neccessary!');
			return
		};
		createCube({
			name,
			description,
			imageUrl,
			difficultyLevel,
		});
		res.redirect('/');
	});
	app.get('/about', (req, res) => {
		res.render('about', {
			"title": 'About | Cubicle'
		});
	});
	app.get('/create', (req, res) => {
		res.render('create', {
			"title": 'Create | Cubicle'
		});
	});
	app.get('/create/accessory', (req, res) => {
		res.render('createAccessory', {
			"title": 'Create Accessory | Cubicle'
		})
	});
	app.get('/details/:id', async (req, res) => {
		const currentCube = await getOne(req.params.id);
		res.render('details', {
			"title": 'Details | Cubicle',
			...currentCube
		});
	});
	app.use('*', (req, res) => {
		res.render('404', {
			"title": 'Error 404'
		});
	});
};