
const product = require('../model/product');
const { v4: uuidv4 } = require('uuid');

const getAll = async (req, res) => {
    const query = req?.query;
    try {
        const readyToBeResponse = await product.getAll(query);
        res.send(readyToBeResponse);
    } catch (error) {
        res.status(500).send({ error: error?.message });
        console.log(error);
    };
};

const getOne = async (req, res) => {
    const params = req?.params;
    try {
        const readyToBeResponse = await product.getOne(params);
        res.send(readyToBeResponse);
    } catch (error) {
        res.status(500).send({ error: error?.message });
        console.log(error);
    };
};

const create = async (req, res) => {
    const body = req?.body;
    try {
        const id = uuidv4();
        const readyToBeResponse = await product.create(id , body);
        if (readyToBeResponse && readyToBeResponse.affectedRows > 0) {
            return res.status(200).send({ success: true, message: 'product added successfully' });
        } else {
            return res.status(500).send({ success: false, message: 'Could not add new product' });
        };
    } catch (error) {
        res.status(500).send({ error: error?.message });
        console.log(error);
    }; 
};

const update = async (req, res) => {
    const params = req?.params;
    const body = req?.body;
    try {
        const readyToBeResponse = await product.update(params , body);
        if (readyToBeResponse && readyToBeResponse.affectedRows > 0) {
            return res.status(200).send({ success: true, message: 'product updated successfully' });
        } else {
            return res.status(500).send({ success: false, message: 'Could not update product' });
        };
    } catch (error) {
        res.status(500).send({ error: error?.message });
        console.log(error);
    }; 
};

const deleteproduct = async (req , res) => {
    const params = req?.params;
    try {
        const readyToBeResponse = await product.deleteproduct(params);
        if (readyToBeResponse && readyToBeResponse.affectedRows > 0) {
            return res.status(200).send({ success: true, message: 'product Deleted successfully' });
        } else {
            return res.status(500).send({ success: false, message: 'No changes made or product not found' });
        };
    } catch (error) {
        res.status(500).send({ error: error?.message });
        console.log(error);
    };
};


module.exports = {
	getAll,
	getOne,
	create,
	update,
	deleteproduct
};