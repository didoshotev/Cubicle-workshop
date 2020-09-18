const env = process.env.NODE_ENV || 'development';

const { createCube, getCubeAndAccessory } = require('../controllers/CRUD-cube');
const { authAccess, getUserStatus } = require('../controllers/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config')[env];

module.exports = (app) => {
    app.post('/create', authAccess, (req, res) => {
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
		const token = req.cookies['aid'];
		const decodedObject = jwt.verify(token, config.privateKey)

		createCube({
			name,
			description,
			imageUrl,
			difficultyLevel,
			decodedObject
		});
		res.redirect('/');
    });
    
	app.get('/create', authAccess, getUserStatus, (req, res) => {
		res.render('create', {
			"title": 'Create | Cubicle',
			isLoggedIn: req.isLoggedIn
		});
	});

    app.get('/edit', authAccess, getUserStatus, (req, res) => {
        res.render('editCubePage', {
			'title': 'Cubicle | Edit',
			isLoggedIn: req.isLoggedIn
        })
    })

	app.get('/details/:id', async (req, res) => {
		const cube = await getCubeAndAccessory(req.params.id);
		res.render('details', {
			"title": 'Details | Cubicle',
			cube
		});
	});

    app.get('/delete', authAccess, getUserStatus, (req, res) => {
        res.render('deleteCubePage', {
			'title': 'Cubicle | Delete',
			isLoggedIn: req.isLoggedIn
        })
    })
};