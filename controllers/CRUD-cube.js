const Cube = require('../models/cube');
const FSpackage = require('./FSpackage');

const createCube = (data) => {
    const { name, description, imageUrl, difficultyLevel } = data;
    const newCube = new Cube(name, description, imageUrl, difficultyLevel);
    newCube.save();
};

const getAllCubes = () => {
        return FSpackage.readAll()
};

const getOne = (id) => {
    return FSpackage.readOne(id);
};

module.exports = {
    createCube,
    getAllCubes,
    getOne,
}


//createCube('Default', 'This is default cube', 'https://google.com', 1)
