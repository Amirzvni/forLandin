
const getCategoriesSchema = {
    querystring: {
    type: 'object',
    properties: {
		limit: { type: 'integer', minimum: 0 },
		offset: { type: 'integer', minimum: 0 },
    },
    dependencies: {
        offset: ['limit'],
        limit: ['offset']  
    }
    }
};

const createCategorySchema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string',
      maxLength: 100,
    },
  }
};

const deleteCategorySchema = {
  params: {
    type: 'object',
    properties: {
      categoryId: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$' }
    },
    required: ['categoryId']
  }
};
module.exports = {
	getCategoriesSchema,
	createCategorySchema,
	deleteCategorySchema
};