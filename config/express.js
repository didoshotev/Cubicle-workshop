const express = require('express');
const handlebars = require('express-handlebars');

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
    app.engine('.hbs', handlebars({
        extname: '.hbs',
        //defaultLayout: 'main',
        //partialsDir: './views/partials'
    }));
    app.set('view engine', '.hbs');
    app.use(express.static('static'));
};