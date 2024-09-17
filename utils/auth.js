const jwt = require('jsonwebtoken');
const secretKey = process.env.JWTSecretToken;
const user = require('../model/user');

const authenticator = (req, res, next) => {
    const { authorization } = req?.headers;
    const requestPath = req?.raw?.url.split('?')[0];
    console.log(requestPath)
    if (!authorization) {
        res.status(401).send({
            message: "Token Required"
        });
        return;
    }

    const token = authorization.split(' ')[1];
    const decoded = jwt.decode(token);
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (!decoded) {
        res.status(401).send({
            error: "Invalid token"
        });
        return;
    }

     if (decoded.exp && decoded.exp < currentTimestamp) {
         res.status(401).send({
             error: "Token has Expired"
         });
         return;
    }

    const isAuthorized = decoded?.scope.some((scopeObj) => {
        const scopePath = Object.values(scopeObj)[0];
        const pathRegex = new RegExp(`^/api${scopePath.replace(/:[^/]+/g, '[^/]+')}$`);
        return pathRegex.test(requestPath);
    });

    if (!isAuthorized) {
        res.status(403).send({
            message: "Access Denied"
        });
        return;
    }

    next();
};

const selfAccessAuth = async (req, res) => { 
    const { authorization } = req?.headers;
    const { userId } = req?.params;
    const token = authorization.split(' ')[1];
    const decoded =  jwt.decode(token);
    const requesteePhoneNumber = decoded?.phoneNumber;
    const findNumberById = await user.getUserPhoneNumber(userId);
    const isAdmin = await user.checkIfAdmin(requesteePhoneNumber);

    if (isAdmin) {
        return;
    };

    if (requesteePhoneNumber !== findNumberById[0]?.phoneNumber) {
        res.status(403).send({
            message: "Access Denied"
        });
        return;
    };

    return;
};

module.exports = {
    authenticator,
    selfAccessAuth
};
