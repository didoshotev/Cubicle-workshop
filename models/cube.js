const { v4: uuidv4, v4 } = require('uuid');
const FSpackage = require('../controllers/FSpackage');

class Cube {
    constructor(name, description, imageUrl, difficulty){
        this.id = v4();
        this.name = name || 'no name';
        this.description = description;
        this.imageUrl = imageUrl || 'img';
        this.difficulty = difficulty || 1;
    };
    get cube(){
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty,
        };
    };
    save(){
        FSpackage.write(this.cube);
    };
};


module.exports = Cube;