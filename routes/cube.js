const { createCube, getCubeAndAccessory } = require('../controllers/CRUD-cube');


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