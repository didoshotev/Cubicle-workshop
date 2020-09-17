const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const cubeRoute = require('./routes/cube');
const accessoryRoute = require('./routes/accessory');

mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}, (err) => {
    if(err){
        console.error(err);
        throw err;
    };
    console.log('Database is setup and running!');
});

require('./config/express')(app);
authRoute(app);
cubeRoute(app);
accessoryRoute(app);
indexRoute(app);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));