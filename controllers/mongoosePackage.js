const Cube = require('../models/cube');

const mongodbPackage = {
    write: async function(newCube){
        new Cube(newCube).save((err) => {
            if (err){
                console.error('Error!!', err);
                return;
            };
            console.log('Successfully stored!');
        });
    },
    getAllCubes: async function(){
        const cubes = await Cube.find().lean()
        return cubes;
    },
    getOneCube: async function(id){
        const cube = await Cube.findById(id).lean();
        return cube
    }
};

module.exports = mongodbPackage;


// , (err) => {
//     console.log('Cube:', cube);
//     if(err){
//         console.error('Error in MongoosePackage', err);
//         return
//     };
//     return cube;
// }