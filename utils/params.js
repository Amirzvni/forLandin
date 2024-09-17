

const paramsMapper = (request , response , next) => {
const query = {...request.query};
  Object.keys(query).forEach(key => {
    if (query[key] === '') {
      delete query[key];
    }
  });
  request.query = query;
next()
}

module.exports = {
  paramsMapper
};