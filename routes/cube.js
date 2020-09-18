const env = process.env.NODE_ENV || 'development';

const { createCube, getCubeAndAccessory } = require('../controllers/CRUD-cube');
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
    
	app.get('/create', (req, res) => {
		res.render('create', {
			"title": 'Create | Cubicle'
		});
	});

    app.get('/edit', (req, res) => {
        res.render('editCubePage', {
            'title': 'Cubicle | Edit'
        })
    })

	app.get('/details/:id', async (req, res) => {
		const cube = await getCubeAndAccessory(req.params.id);
		res.render('details', {
			"title": 'Details | Cubicle',
			cube
		});
	});

    app.get('/delete', (req, res) => {
        res.render('deleteCubePage', {
            'title': 'Cubicle | Delete'
        })
    })
};