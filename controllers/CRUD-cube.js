const Cube = require('../models/cube');
const fs = require('fs');
const path = require('path');
const databaseFile = path.join(__dirname, '..', 'config/database.json');


const createCube = (data) => {
    const { name, description, imageUrl, difficultyLevel } = data;
    const newCube = new Cube(name, description, imageUrl, difficultyLevel);
    newCube.save();
};

const getAllCubes = () => {
        const cubes = fs.readFileSync(databaseFile);
        return JSON.parse(cubes);
};

const getOne = (id) => {
    return JSON.parse(fs.readFileSync(databaseFile))
    .filter(x => x.id === id);  
};

module.exports = {
    createCube,
    getAllCubes,
    getOne,
}


//createCube('Default', 'This is default cube', 'https://google.com', 1)
