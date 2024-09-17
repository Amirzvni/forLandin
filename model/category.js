
const db = require('../db/db');
const promisePool = db.promise();
const { getCountOfTable , buildWhereClause } = require('../utils/count');


const create = async (id , name) => {
	try {
		const sqlQuery = `INSERT INTO category (id , name) VALUES ('${id}' ,'${name}')`;
		const results = await promisePool.query(sqlQuery);
		return results[0];
	} catch (error) {
		throw error;
	}
};

const getAll = async (query) => {
	const { limit , offset } = query;
	try {
		const totalCount = await getCountOfTable("category", query);
		const sqlQuery = `SELECT * FROM category ${limit ? `LIMIT ${limit} OFFSET ${offset}` : ''}`;
		const results = await promisePool.query(sqlQuery);
		return {
			total: totalCount,
			category : results[0]
		}
	} catch (error) {
		throw error;
	};	
};

const deletecategory = async (params) => {
	const whereString = buildWhereClause(params);
	try {
		const sqlQuery = `DELETE FROM category ${whereString}`;
		const results = await promisePool.query(sqlQuery);
		return results[0]
	} catch (error) {
		throw error;
	};	
};

module.exports = {
	getAll,
	create,
	deletecategory
};