
const userLoginSchema = {
  type: 'object',
  required: ['phoneNumber'],
  properties: {
    phoneNumber: {
      type: 'string',
      pattern: '^0[0-9]{10}$',
      minLength: 11, 
    },
  },
};

const userVerifySchema = {
  type: 'object',
  required: ['phoneNumber'],
  properties: {
    phoneNumber: {
      type: 'string',
      pattern: '^0[0-9]{10}$',
      minLength: 11, 
    },
    otp : {
          type: 'string',
          pattern: '^[0-9]{6}$'
        },
  },
};

const resendOtpSchema = {
    querystring: {
    type: 'object',
    properties: {
        phoneNumber : { type : 'string' , pattern: '^0[0-9]{10}$', minLength: 11 },
    },
      required: ['phoneNumber'],
    }
};

const getUsersSchema = {
    querystring: {
    type: 'object',
    properties: {
      phoneNumber: { type: 'string', pattern: '^0[0-9]{10}$', minLength: 11 },
      limit : { type : 'integer' , minimum : 0 },
      offset : { type : 'integer' , minimum : 0 },
    },
    dependencies: {
        offset: ['limit'],
        limit: ['offset']  
    }
    }
};

const getUserSchema = {
  params: {
    type: 'object',
    properties: {
      userId: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$' }
    },
    required: ['userId']
  }
};

const updateUserSchema = {
  params: {
    type: 'object',
    properties: {
      userId: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$' }
    },
    required: ['userId'],
  },
  body: {
    type: 'object',
    properties: {
      firstName: { type: 'string', maxLength: 50 },
      lastName: { type: 'string', maxLength: 50 },
      phoneNumber: { type: 'string', pattern: '^0[0-9]{10}$', minLength: 11 },
      state: { type: 'string', maxLength: 50 },
      city: { type: 'string', maxLength: 50 },
      locale: { type: 'string', maxLength: 50 },
      address: { type: 'string' },
      plate: { type: 'string', maxLength: 20 },
      unit: { type: 'string', maxLength: 20 },
      zipCode: { type: 'string', maxLength: 10 }
    },
  }
};

const deleteUserSchema = {
  params: {
    type: 'object',
    properties: {
      userId: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$' }
    },
    required: ['userId']
  }
};


module.exports = {
  userLoginSchema,
  userVerifySchema,
  resendOtpSchema,
  getUsersSchema,
  getUserSchema,
  updateUserSchema,
  deleteUserSchema
}