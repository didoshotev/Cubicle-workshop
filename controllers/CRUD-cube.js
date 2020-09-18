const Cube = require('../models/cube');
const mongoosePackage = require('./mongoosePackage');

const createCube = (data) => {
    const { name, description, imageUrl, difficultyLevel, decodedObject } = data;
    const newCube = new Cube({name, description, imageUrl, difficulty:difficultyLevel, creatorID: decodedObject.userID});
    newCube.save();
};

const getAllCubes = async () => {
    return await mongoosePackage.getAllItems(Cube)
};

const getOneCube = async (id) => {
    return await mongoosePackage.getOneItem(id, Cube);
};

const pushAccessory = async (id, itemId) => {
    return await mongoosePackage.pushToArray(id, Cube, itemId);
};

const getCubeAndAccessory = async(id) => {
    return await mongoosePackage.getItemPopulate(id, Cube, 'accessories')
}

module.exports = {
    createCube,
    getAllCubes,
    getOneCube,
    pushAccessory,
    getCubeAndAccessory
}


//createCube('Default', 'This is default cube', 'https://google.com', 1)
