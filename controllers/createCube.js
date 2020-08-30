const Cube = require('../models/cube');

const createCube = (data) => {
    const { name, description, imageUrl, difficultyLevel } = data;
    const newCube = new Cube(name, description, imageUrl, difficultyLevel);
    newCube.save();
};

module.exports = {
    createCube,
}


//createCube('Default', 'This is default cube', 'https://google.com', 1)
