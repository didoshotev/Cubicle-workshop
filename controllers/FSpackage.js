const fs = require('fs');
const path = require('path');
const databaseFile = path.join(__dirname, '..', 'config/database.json');

const FSpackage = {
    write: function (newCube) {
        fs.readFile(databaseFile, (err, dbData) => {
            if (err) {
                throw err;
            }
            const cubes = JSON.parse(dbData);
            cubes.push(newCube);

            fs.writeFile(databaseFile, JSON.stringify(cubes), error => {
                if (error) {
                    throw error;
                };
                console.log('New Cube is successfully added!');
            });
        });
    },
    readAll: function () {
        const cubes = fs.readFileSync(databaseFile);
        return JSON.parse(cubes);
    },
    readOne: function (id) {
        return JSON.parse(fs.readFileSync(databaseFile))
            .filter(x => x.id === id);
    },
}

module.exports = FSpackage;