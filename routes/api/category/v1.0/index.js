'use strict'

const category = require('../../../../controller/category');
const { authenticator } = require('../../../../utils/auth');
const {
	getCategoriesSchema,
	createCategorySchema,
	deleteCategorySchema
  } = require('../../../../schema/category');
const { paramsMapper } = require('../../../../utils/params');

module.exports = async function (fastify, opts) {
	fastify.get('/list', { preValidation: [paramsMapper] , schema : getCategoriesSchema }, category.getAll);
	fastify.post('/create', { preValidation: [authenticator, paramsMapper], schema: { body: createCategorySchema } }, category.create);
	fastify.delete('/delete/:categoryId', { preValidation: [authenticator , paramsMapper] , schema : deleteCategorySchema }, category.deleteCategory);
};