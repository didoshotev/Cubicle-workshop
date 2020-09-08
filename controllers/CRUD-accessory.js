const Accessory = require('../models/accessory');
const mongoosePackage = require('./mongoosePackage');

const createAccessory = (data) => {
    const { name, description, imageUrl } = data;
    const newAccessory = new Accessory({name, description, imageUrl});
    newAccessory.save();
};

const getAllAccessories = async () => {
    return await mongoosePackage.getAllItems(Accessory);
};

const getOneAccessory = async (id) => {
    return await mongoosePackage.getOneItem(id, Accessory);
};

const getCurrentAccessories = async (id, currentIds) => {
    return await mongoosePackage.getSelectedItems(id, Accessory)
};

module.exports = {
    createAccessory,
    getAllAccessories,
    getOneAccessory,
}
