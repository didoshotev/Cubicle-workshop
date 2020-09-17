const { getOneCube, pushAccessory,} = require('../controllers/CRUD-cube');
const { createAccessory, getAllAccessories, } = require('../controllers/CRUD-accessory');


module.exports = (app) => {
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

};