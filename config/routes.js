// TODO: Require Controllers...
const express = require('express');
const Cube = require('../models/cube');
const {createCube} = require('../controllers/createCube');

module.exports = (app) => {
	app.get('/', (req, res) => {
		res.render('index', {
			"title": 'Home | Cubicle'
		});
	});
	app.post('/create', (req, res) => {
		const {
			name,
			description,
			imageUrl,
			difficultyLevel,
		} = req.body;
		if(!name){
			alert('Name Field is neccessary!');
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
	app.get('/details:id', (req, res) => {
		res.render('details', {
			"title": 'Details | Cubicle'
			//add id
		});
	});
	app.use('*', (req, res) => {
		res.render('404', {
			"title": 'Error 404'
		});
	});
};