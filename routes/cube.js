const env = process.env.NODE_ENV || 'development';

const { createCube, getCubeAndAccessory } = require('../controllers/CRUD-cube');
const { authAccess, getUserStatus } = require('../controllers/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config')[env];

module.exports = (app) => {
	app.post('/create', (req, res) => {
		const {
			name,
			description,
			imageUrl,
			difficultyLevel,
		} = req.body;
		try {
			if (name.length < 5 || !name.match(/^[A-Za-z0-9\s]+$/)) {
				throw new TypeError('Cube name is invalid')
			} else if (description.length < 20 || !description.match(/^[A-Za-z0-9\s]+$/)) {
				throw new TypeError('Cube description is invalid')
			} else if (!imageUrl.match(/^http(s)?:\/\/\S+/)) {
				throw new TypeError('Cube image url is invalid')
			}
		} catch (err) {
			res.status(401);
			res.redirect('/create?error=true')
			return
		}
		const token = req.cookies['aid'];
		const decodedObject = jwt.verify(token, config.privateKey)
		if (decodedObject) {
			createCube({
				name,
				description,
				imageUrl,
				difficultyLevel,
				decodedObject
			});
			res.redirect('/');
		}

	});

	app.get('/create', authAccess, getUserStatus, (req, res) => {
		const error = req.query.error ? 'Invalid credentials' : null;
		res.render('create', {
			"title": 'Create | Cubicle',
			isLoggedIn: req.isLoggedIn,
			error
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