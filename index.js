const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const express = require('express');
const app = express();
const mongoose = require('mongoose');

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
require('./routes/index')(app);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));