
const getproductsSchema = {
    querystring: {
    type: 'object',
    properties: {
		limit: { type: 'integer', minimum: 0 },
		offset: { type: 'integer', minimum: 0 },
		name: {
			type: 'string',
			maxLength: 100,
		},
		productBrand: { type: 'string', maxLength : 20 },
		carName: { type: 'string', maxLength : 20},
		categoryOf: { type: 'string', maxLength : 20},
		countryOf: { type: 'string', maxLength : 20},
		priceFrom : { type : 'integer' , minimum : 0 },
		priceTo: { type: 'integer', minimum: 0 },
		warranty: { type: 'string' , enum : ['yes' , 'no']}
		
    },
    dependencies: {
        offset: ['limit'],
        limit: ['offset']  
    }
    }
};

const createproductSchema = {
  type: 'object',
	required: ['name', 'productBrand', 'carName', 'categoryOf', 'countryOf', 'price', 'warranty', 'description', 'manufacturerOf'],
	properties: {
		name : {
			type: 'string',
			maxLength: 100,
		},
		productBrand: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$' },
		carName: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$' },
		categoryOf: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$' },
		countryOf: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$' },
		manufacturerOf: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$' },
		price: { type: 'integer', minimum: 0 },
		warranty: { type: 'integer', enum : [ 0 , 1] },
		description : { type : 'string'}
  }
};

const getproductSchema = {
  params: {
    type: 'object',
    properties: {
      productId: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$' }
    },
    required: ['productId']
  }
};

const updateproductSchema = {
  params: {
    type: 'object',
    properties: {
		name : {
			type: 'string',
			maxLength: 100,
		},
		productBrand: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$' },
		carName: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$' },
		categoryOf: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$' },
		countryOf: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$' },
		manufacturerOf: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$' },
		price: { type: 'integer', minimum: 0 },
		warranty: { type: 'boolean' },
		description : { type : 'string'}
    },
    required: ['productId']
  }
};

const deleteproductSchema = {
  params: {
    type: 'object',
    properties: {
      productId: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$' }
    },
    required: ['productId']
  }
};

module.exports = {
	getproductSchema,
	getproductsSchema,
	createproductSchema,
	updateproductSchema,
	deleteproductSchema
};