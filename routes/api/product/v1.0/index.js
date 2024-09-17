'use strict'

const product = require('../../../../controller/product');
const { authenticator } = require('../../../../utils/auth');
const {
	getproductSchema,
	getproductsSchema,
	createproductSchema,
	updateproductSchema,
	deleteproductSchema
  } = require('../../../../schema/product');
const { paramsMapper } = require('../../../../utils/params');

module.exports = async function (fastify, opts) {
	fastify.get('/list', { preValidation: [authenticator , paramsMapper] , schema : getproductsSchema }, product.getAll);
	fastify.get('/get/:productId', { preValidation: [authenticator, paramsMapper], schema: getproductSchema }, product.getOne);
	fastify.post('/create', { preValidation: [authenticator, paramsMapper], schema: { body: createproductSchema } }, product.create);
	fastify.patch('/update/:productId', { preValidation: [authenticator, paramsMapper], schema: updateproductSchema }, product.update);
	fastify.delete('/delete/:productId', { preValidation: [authenticator , paramsMapper] , schema : deleteproductSchema }, product.deleteproduct);
};