const mongoose = require('mongoose');

const CubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: [/^[A-Za-z0-9\s]+$/, 'Cube Name incorrect'],
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
        minlength: 20,
        match: [/^[A-Za-z0-9\s]+$/, 'Cube Name incorrect']
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^http(s)?:\/\/\S+/, 'Invalid imageUrl']
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [{
        type: 'ObjectId',
        ref: 'Accessory'
    }],
    creatorID: {
        type: 'ObjectId',
        ref: 'User'
    }
});


module.exports = mongoose.model('Cube', CubeSchema);