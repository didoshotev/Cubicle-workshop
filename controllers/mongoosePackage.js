const mongodbPackage = {
    write: async function (newItem, theClass) {
        new theClass(newItem).save((err) => {
            if (err) {
                console.error('Error!!', err);
                return;
            };
            console.log('Successfully stored!');
        });
    },
    getAllItems: async function (theClass) {
        const items = await theClass.find().lean()
        return items;
    },
    getOneItem: async function (id, theClass) {
        const item = await theClass.findById(id).lean();
        return item
    },
    pushToArray: async function (id, theClass, accessoryId) {
        await theClass.findByIdAndUpdate(id, {
            $addToSet: {
                accessories: [accessoryId]
            }
        }
        )
    },
    getItemPopulate: async function (id, theClass, arr) {
       return await theClass.findById(id).populate(arr).lean()
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