
const db = require('../db/db');
const promisePool = db.promise();
const moment = require('moment-timezone');
const { getCountOfTable , buildWhereClause } = require('../utils/count');

const checkUserExist = async (phoneNumber) => {
	try {
		const sqlQuery = `SELECT phoneNumber FROM users WHERE phoneNumber = '${phoneNumber}' `;
		const results = await promisePool.query(sqlQuery);
		return results[0];
	} catch (error) {
		throw error;
	}
};

const createUser = async (id, phoneNumber, otp, otpExpiration) => {
	console.log(otpExpiration)
	try {
		const sqlQuery = `INSERT INTO users (id , phoneNumber, otp , otpExpiration) VALUES ('${id}' ,'${phoneNumber}', '${otp}' , '${otpExpiration}')`;
		const results = await promisePool.query(sqlQuery);
		return results[0];
	} catch (error) {
		throw error;
	}
};

const getUserScope = async (phoneNumber) => {
	try {
		const sqlQuery = `
			SELECT DISTINCT s.path 
			FROM users u 
			JOIN service s ON 
				(u.accessLevel = 'admin' OR (u.accessLevel = 'user' AND s.type = 'share'))
			WHERE u.phoneNumber = ?`;
		const results = await promisePool.query(sqlQuery, [phoneNumber]);
		const mappedScope = results[0].map((obj, index) => {
		const newObj = {};
		newObj[index + 1] = obj.path;
		return newObj;
		});
		return mappedScope;
	} catch (error) {
		throw error;
	}
};

const getOneUser = async (phoneNumber) => {
	try {
		const sqlQuery = `SELECT * FROM users WHERE phoneNumber = '${phoneNumber}' `;
		const results = await promisePool.query(sqlQuery);
		return results[0]
	} catch (error) {
		throw error;
	}
};

const renewOtp = async (phoneNumber , newOtp , otpExpiration) => {
	try {
		const sqlQuery = `
			UPDATE users
			SET otp = '${newOtp}', otpExpiration = '${otpExpiration}' 
			WHERE phoneNumber = '${phoneNumber}'
			`;
		const results = await promisePool.query(sqlQuery);
		return results[0];
	} catch (error) {
		throw error;
	}
};

const checkOtp = async (phoneNumber, newOtp) => {
  try {
    const sqlQuery = 'SELECT otp, otpExpiration FROM users WHERE phoneNumber = ?';
    const [rows, fields] = await promisePool.query(sqlQuery, [phoneNumber]);
    const storedOtp = rows[0].otp;
    const otpExpirationStr = rows[0].otpExpiration;

    const otpExpiration = moment.tz(otpExpirationStr, 'YYYY-MM-DD HH:mm:ss', 'Asia/Tehran');
    const currentTime = moment().tz('Asia/Tehran');

    if (currentTime.isAfter(otpExpiration)) {
      return { expired: true };
    }
    if (storedOtp == newOtp) {
      return { matched: true };
    } else {
      return { matched: false };
    }
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async (query) => {
	const whereString = buildWhereClause(query);
	const { limit , offset } = query;
	try {
		const totalCount = await getCountOfTable('users', query);
		const sqlQuery = `SELECT * FROM users ${whereString} ${limit ? `LIMIT ${limit} OFFSET ${offset}` : ''}`;
		const results = await promisePool.query(sqlQuery);
		return {
			total: totalCount,
			users : results[0]
		}
	} catch (error) {
		throw error;
	};	
};

const checkIfAdmin = async (phoneNumber) => {
	try {
		const sqlQuery = `SELECT accessLevel FROM users WHERE phoneNumber = ?`;
		const results = await promisePool.query(sqlQuery, [phoneNumber]);
		const accessLevel = results[0][0].accessLevel;
		if (accessLevel === 'admin') {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		throw error;
	};	
};

const getUser = async (params) => {
	const whereString = buildWhereClause(params);
	try {
		const sqlQuery = `SELECT * FROM users ${whereString}`;
		const results = await promisePool.query(sqlQuery);
		return results[0]
	} catch (error) {
		throw error;
	};	
};

const updateUser = async (params, query) => {
  const whereString = buildWhereClause(params);
  const { firstName, lastName, phoneNumber, state, city, locale, address, plate, unit, zipCode } = query;

  try {
    const sqlQuery = `UPDATE users
      SET 
        firstName = IFNULL(?, firstName),
        lastName = IFNULL(?, lastName),
        phoneNumber = IFNULL(?, phoneNumber),
        state = IFNULL(?, state),
        city = IFNULL(?, city),
        locale = IFNULL(?, locale),
        address = IFNULL(?, address),
        plate = IFNULL(?, plate),
        unit = IFNULL(?, unit),
        zipCode = IFNULL(?, zipCode)
      ${whereString}`;

    const results = await promisePool.query(sqlQuery, [
      firstName, lastName, phoneNumber, state, city, locale, address, plate, unit, zipCode
    ]);

    return results[0];
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (params) => {
	const whereString = buildWhereClause(params);
	try {
		const sqlQuery = `DELETE FROM users ${whereString}`;
		console.log(sqlQuery)
		const results = await promisePool.query(sqlQuery);
		return results[0]
	} catch (error) {
		throw error;
	};	
};

const getUserPhoneNumber = async (userId) => {
	try {
		const sqlQuery = `SELECT phoneNumber FROM users WHERE id = '${userId}' `;
		const results = await promisePool.query(sqlQuery);
		return results[0];
	} catch (error) {
		throw error;
	};

};

const saveProfile = async (path, params) => {
	const { userId } = params;
	try {
		const sqlQuery = `UPDATE users SET profilePicture = ? WHERE id = ?`;
		const [results] = await promisePool.query(sqlQuery, [path, userId]);
		return results
	} catch (error) {
		throw error;
	};
};

module.exports = {
	checkUserExist,
	createUser,
	getUserScope,
	getOneUser,
	renewOtp,
	checkOtp,
	getAllUsers,
	checkIfAdmin,
	getUser,
	updateUser,
	deleteUser,
	getUserPhoneNumber,
	saveProfile
};