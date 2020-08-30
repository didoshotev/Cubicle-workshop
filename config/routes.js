// TODO: Require Controllers...
const express = require('express');
const Cube = require('../models/cube');
const { createCube, getAllCubes, getOne } = require('../controllers/CRUD-cube');

module.exports = (app) => {
	app.get('/', (req, res) => {
		res.render('index', {
			"title": 'Home | Cubicle',
			cubes: getAllCubes()
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
	app.get('/details/:id', (req, res) => {
		const currentCube = getOne(req.params.id)[0];
		res.render('details', {
			"title": 'Details | Cubicle',
			currentCube
		});
	});
	app.use('*', (req, res) => {
		res.render('404', {
			"title": 'Error 404'
		});
	});
};