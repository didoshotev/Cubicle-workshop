const { getOneCube, pushAccessory,} = require('../controllers/CRUD-cube');
const { createAccessory, getAllAccessories, } = require('../controllers/CRUD-accessory');
const { authAccess, getUserStatus } = require('../controllers/user');

module.exports = (app) => {
    app.get('/create/accessory', authAccess, getUserStatus,(req, res) => {
		res.render('createAccessory', {
			"title": 'Create Accessory | Cubicle',
			isLoggedIn: req.isLoggedIn
		})
	});
	app.post('/create/accessory', authAccess, (req, res) => {
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
	app.get('/attach/accessory/:id', authAccess, getUserStatus, async (req, res) => {
		const currentCube = await getOneCube(req.params.id);
		const accessories = await getAllAccessories();
		res.render('attachAccessory', {
			"title": 'Attach Accessory | Cubicle',
			...currentCube,
			accessories,
			isLoggedIn: req.isLoggedIn
		})
	});
	app.post('/attach/accessory/:id', authAccess, async (req, res) => {
		const cubeId = req.params.id;
		const selectedAccessoryId = req.body.accessory;
		await pushAccessory(cubeId, selectedAccessoryId);
		res.redirect('/');
	});

};