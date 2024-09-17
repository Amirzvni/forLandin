
const user = require('../model/user');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWTSecretToken;
const moment = require('moment-timezone');
const path = require('path');
const fs = require('fs');
const { pipeline } = require('stream');
const util = require('util');

const pipelineAsync = util.promisify(pipeline);

const login = async (req, res) => {
    const { phoneNumber } = req?.body;
    if (!phoneNumber) {
        res.status(400).send("Bad Request");
        return;
    };
    try {
        const phoneNumberExists = await user.checkUserExist(phoneNumber);
        if (phoneNumberExists.length === 0) {
            const id = uuidv4();
            const otp = Math.floor(100000 + Math.random() * 899999);
            const currentTime = moment().tz("Asia/Tehran"); 
            const otpExpiration = moment(currentTime).add(2, 'minutes'); 
            const formattedExpiration = otpExpiration.format('YYYY-MM-DD HH:mm:ss');
            const createNewUser = await user.createUser(id , phoneNumber, otp , formattedExpiration );
            if (createNewUser?.affectedRows === 1) {
                console.log(otp)
                res.status(200).send({
                    status:200,
                    otp: otp,
                });
                return;
            } else {
                res.status(500).send("Error While Creating User");
                return;
            }
        } else {
            const newOtp = Math.floor(100000 + Math.random() * 899999);
            const currentTime = moment().tz("Asia/Tehran"); 
            const otpExpiration = moment(currentTime).add(2, 'minutes'); 
            const formattedExpiration = otpExpiration.format('YYYY-MM-DD HH:mm:ss');
            const updateOtpInDb = await user.renewOtp(phoneNumber, newOtp , formattedExpiration );
            if (updateOtpInDb?.affectedRows === 1) {
                console.log(newOtp)
                res.status(200).send({
                    otp: newOtp
                });
                return;
            };
         }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Error" });
        return;
    };
};

const adminlogin = async (req, res) => {
    const { phoneNumber } = req?.body;
    if (!phoneNumber) {
        res.status(400).send("Bad Request");
        return;
    };
    try {
        const phoneNumberExists = await user.checkUserExist(phoneNumber);
        if (phoneNumberExists.length === 0) {
            res.status(404).send({error : "User Not Found"});
            return;
        } else {
            const checkIfAdmin = await user.checkIfAdmin(phoneNumber);
            if (checkIfAdmin) {
                const newOtp = Math.floor(100000 + Math.random() * 899999);
                const currentTime = moment().tz("Asia/Tehran"); 
                const otpExpiration = moment(currentTime).add(2, 'minutes'); 
                const formattedExpiration = otpExpiration.format('YYYY-MM-DD HH:mm:ss');
                const updateOtpInDb = await user.renewOtp(phoneNumber, newOtp , formattedExpiration );
                if (updateOtpInDb?.affectedRows === 1) {
                    console.log(newOtp)
                    res.status(200).send({
                        otp: newOtp
                    });
                    return;
                };  
            } else {
                res.status(403).send({error : "Access Denied"});
                return;
            }
         }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Error" });
        return;
    };
};

const verify = async (req, res) => {
    const { phoneNumber , otp } = req?.body;
    if (!phoneNumber || !otp) {
        res.status(400).send("Bad Request");
        return;
    };
    try {
        const phoneNumberExists = await user.checkUserExist(phoneNumber);
        if (phoneNumberExists.length === 0) {
            res.status(404).send({ error: "User Not Found" });
            return;
        } else {
            const isOtpValid = await user.checkOtp(phoneNumber, otp);
            if (isOtpValid?.expired) {
                res.status(400).send({ error: "otp is expired" }); 
                return;
            } else if (isOtpValid?.matched) {
                const scope = await user.getUserScope(phoneNumber);   
                const payload = {
                    phoneNumber,
                    scope,
                };
                const options = {
                expiresIn: '1d',
                };
                const accessToken = jwt.sign(payload, secretKey, options);
                const readyToBeResponseToken = {
                    accessToken,
                    options
                }
                res.status(200).send(readyToBeResponseToken);
                return;
            } else {
                res.status(400).send({ error: "otp is not valid" });
                return;
            }
         }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Error" });
        return;
    };
};

const resendOtp = async (req, res) => {
    const { phoneNumber } = req?.query;
    if (!phoneNumber) {
        res.status(400).send("Bad Request");
        return;
    };
    const phoneNumberExists = await user.checkUserExist(phoneNumber);
    if (phoneNumberExists.length === 0) {
        res.status(404).send({ error: "User Not Found" });
        return;
    };
    try {
        const newOtp = Math.floor(100000 + Math.random() * 899999);
        const currentTime = moment().tz("Asia/Tehran"); 
        const otpExpiration = moment(currentTime).add(2, 'minutes'); 
        const formattedExpiration = otpExpiration.format('YYYY-MM-DD HH:mm:ss');
        const updateOtpInDb = await user.renewOtp(phoneNumber, newOtp , formattedExpiration );
        if (updateOtpInDb?.affectedRows === 1) {
            console.log("new:", newOtp)
            res.status(200).send({
                status : 200,
                otp: newOtp
            });
            return;
        };
    } catch (error) {
        res.status(500).send({ error: error?.message });
        console.log(error);
    };
};

const getAll = async (req, res) => {
    const query = req?.query;
    try {
        const readyToBeResponse = await user.getAllUsers(query);
        res.send(readyToBeResponse);
    } catch (error) {
        res.status(500).send({ error: error?.message });
        console.log(error);
    };
};

const getOne = async (req, res) => {
    const params = req?.params;
    try {
        const readyToBeResponse = await user.getUser(params);
        res.send(readyToBeResponse);
    } catch (error) {
        res.status(500).send({ error: error?.message });
        console.log(error);
    };
};

const updateUser = async (req, res) => {
    const params = req?.params;
    const query = req?.body;
    try {
        const readyToBeResponse = await user.updateUser(params , query);
        if (readyToBeResponse && readyToBeResponse.affectedRows > 0) {
            return res.status(200).send({ success: true, message: 'User updated successfully' });
        } else {
            return res.status(500).send({ success: false, message: 'No changes made or user not found' });
        };
    } catch (error) {
        res.status(500).send({ error: error?.message });
        console.log(error);
    };
};

const deleteUser = async (req, res) => {
    const params = req?.params;
    try {
        const readyToBeResponse = await user.deleteUser(params);
        if (readyToBeResponse && readyToBeResponse.affectedRows > 0) {
            return res.status(200).send({ success: true, message: 'User Deleted successfully' });
        } else {
            return res.status(500).send({ success: false, message: 'No changes made or user not found' });
        };
    } catch (error) {
        res.status(500).send({ error: error?.message });
        console.log(error);
    };
};

const updateUserProfile = async (req, res) => {
    const params = req?.params;
    try {
        if (!req.isMultipart()) {
            return res.status(400).send({ error: 'Unsupported Media Type' });
        }; 
        
        const data = await req?.file();
         if (!data) {
            return res.status(400).send({ error: 'No file uploaded' });
        };
        
        const { filename, mimetype, file } = data;

        // Validate file type (only images allowed)
        if (!mimetype.startsWith('image/')) {
            return res.status(400).send({ error: 'Invalid file type. Only images are allowed.' });
        };

        const uniqueFileName = `${uuidv4()}-${filename}`;
        const uploadDir = path.join(__dirname, '..', 'uploads'); 
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        };
        const filePath = path.join(uploadDir, uniqueFileName);

        //save the file 
        await pipelineAsync(file, fs.createWriteStream(filePath));

        const savePathToDb =await user.saveProfile(filePath, params)

        if (savePathToDb && savePathToDb.affectedRows > 0) {
            return res.status(200).send({ success: true, message: 'Profile Picture Updated Successfully!' });
        } else {
            return res.status(500).send({ success: false, message: 'No changes made or user not found' });
        };
   
        
    
    } catch (error) {
        res.status(500).send({ error: error?.message });
        console.log(error);
    }
 };

const getProfile = async (req, res) => { 
    const params = req?.params;
    try {
        const readyToBeResponse = await user.getUser(params);
        res.send(readyToBeResponse);
    } catch (error) {
        res.status(500).send({ error: error?.message });
        console.log(error); 
    };
};

module.exports = {
    login,
    adminlogin,
    verify,
    resendOtp,
    getAll,
    getOne,
    deleteUser,
    updateUser,
    updateUserProfile,
    getProfile
};

                