'use strict'

const user = require('../../../../controller/user');
const { authenticator, selfAccessAuth } = require('../../../../utils/auth');
const {
    userLoginSchema,
    userVerifySchema,
    resendOtpSchema,
    getUsersSchema,
    getUserSchema,
    updateUserSchema,
    deleteUserSchema
  } = require('../../../../schema/user');
const { paramsMapper } = require('../../../../utils/params');

module.exports = async function (fastify, opts) {
  fastify.post('/login', { schema : { body : userLoginSchema }, preHandler: fastify.rateLimit({
      key: (req) => req.ip,
      max: 1,
      timeWindow: 2 * 60 * 1000
    })}, user.login);
  fastify.post('/adminlogin', { schema : { body : userLoginSchema }}, user.adminlogin);
  fastify.post('/verify', { schema : { body : userVerifySchema }}, user.verify);
  fastify.get('/resendotp', {
    schema: resendOtpSchema,
    preHandler: fastify.rateLimit({
      key: (req) => req.ip,
      max: 1,
      timeWindow: 2 * 60 * 1000
    })
  },
    user.resendOtp);
  fastify.get('/list', { preValidation: [authenticator , paramsMapper] , schema : getUsersSchema }, user.getAll);
  fastify.get('/get/:userId', { preValidation: [authenticator , paramsMapper] , schema : getUserSchema }, user.getOne);
  fastify.get('/get/profile/:userId', { preValidation: [authenticator , paramsMapper]}, user.getProfile);
  fastify.patch('/update/:userId', { preValidation: [authenticator , paramsMapper, selfAccessAuth] , schema : updateUserSchema }, user.updateUser);
  fastify.patch('/update/profile/:userId', { preValidation: [authenticator , paramsMapper, selfAccessAuth] }, user.updateUserProfile);
  fastify.delete('/delete/:userId', { preValidation: [authenticator , paramsMapper] , schema : deleteUserSchema }, user.deleteUser);
};