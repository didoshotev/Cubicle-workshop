const { createCube, getAllCubes, getOneCube, pushAccessory, getCubeAndAccessory } = require('../controllers/CRUD-cube');
const { createAccessory, getAllAccessories, getOneAccessory } = require('../controllers/CRUD-accessory');

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
	app.post('/create/accessory', (req, res) => {
		const {
			name,
			description,
			imageUrl
		} = req.body
		if (!name || !description || !imageUrl) {
			console.error('Fields must be filled!');
			return
		};
		createAccessory({
			name,
			description,
			imageUrl
		});
		res.redirect('/');
	});
	app.get('/attach/accessory/:id', async (req, res) => {
		const currentCube = await getOneCube(req.params.id);
		const accessories = await getAllAccessories();
		res.render('attachAccessory', {
			"title": 'Attach Accessory | Cubicle',
			...currentCube,
			accessories
		})
	});
	app.post('/attach/accessory/:id', async (req, res) => {
		const cubeId = req.params.id;
		const selectedAccessoryId = req.body.accessory;
		await pushAccessory(cubeId, selectedAccessoryId);
		res.redirect('/');
	});
	app.get('/details/:id', async (req, res) => {
		const cube = await getCubeAndAccessory(req.params.id);
		res.render('details', {
			"title": 'Details | Cubicle',
			cube
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