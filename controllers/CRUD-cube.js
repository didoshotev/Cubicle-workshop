const Cube = require('../models/cube');
const mongoosePackage = require('./mongoosePackage');

const createCube = (data) => {
    const { name, description, imageUrl, difficultyLevel } = data;
    const newCube = new Cube({name, description, imageUrl, difficulty:difficultyLevel});
    newCube.save();
};

const getAllCubes = async () => {
    return await mongoosePackage.getAllCubes()
};

const getOne = async (id) => {
    return await mongoosePackage.getOneCube(id);
};

module.exports = {
    createCube,
    getAllCubes,
    getOne,
}


//createCube('Default', 'This is default cube', 'https://google.com', 1)
