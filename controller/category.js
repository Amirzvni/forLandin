
const category = require('../model/category');
const { v4: uuidv4 } = require('uuid');

const getAll = async (req, res) => {
    const query = req?.query;
    try {
        const readyToBeResponse = await category.getAll(query);
        res.send(readyToBeResponse);
    } catch (error) {
        res.status(500).send({ error: error?.message });
        console.log(error);
    };
};

const create = async (req, res) => {
    const { name } = req?.body;
    try {
        const id = uuidv4();
        const readyToBeResponse = await category.create(id , name);
        if (readyToBeResponse && readyToBeResponse.affectedRows > 0) {
            return res.status(200).send({ success: true, message: 'category added successfully' });
        } else {
            return res.status(500).send({ success: false, message: 'Could not add new category' });
        };
    } catch (error) {
        res.status(500).send({ error: error?.message });
        console.log(error);
    }; 
};

const deleteCategory = async (req, res) => {
    const params = req?.params;
    try {
        const readyToBeResponse = await category.deletecategory(params);
        if (readyToBeResponse && readyToBeResponse.affectedRows > 0) {
            return res.status(200).send({ success: true, message: 'category Deleted successfully' });
        } else {
            return res.status(500).send({ success: false, message: 'No changes made or category not found' });
        };
    } catch (error) {
        res.status(500).send({ error: error?.message });
        console.log(error);
    };
};

module.exports = {
	getAll,
    create,
    deleteCategory
}