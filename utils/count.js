
const db = require('../db/db');
const promisePool = db.promise();

const buildWhereClause = (query) => {
	const { phoneNumber,
		userId,
		transactionId,
		transactionUser,
		name,
		manufacturerId,
		car,
		manufacturerSearch,
		carId,
		categoryId,
		countryId,
		supplierId,
		shopId,
		brandId,
		commentId,
		userCommented,
		productCommented,
		userrequested,
		requestId,
		productId,
		productName,
		productBrand,
		carName,
		categoryOf,
		countryOf,
		warranty,
		priceFrom,
		priceTo
	} = query;
	let whereClauses = [];
	if (phoneNumber) {
		whereClauses.push(`(phoneNumber LIKE '${phoneNumber}')`);
	};

	if (userId) {
		whereClauses.push(`(id = '${userId}')`);
	};

	if (manufacturerId) {
		whereClauses.push(`(id = '${manufacturerId}')`);
	};

	if (transactionId) {
		whereClauses.push(`(t.id = '${transactionId}')`);
	};

	if (transactionUser) {
		whereClauses.push(`(u.phoneNumber = ${transactionUser})`);
	};

	if (transactionUser) {
		whereClauses.push(`(u.phoneNumber = ${transactionUser})`);
	};

	if (name) {
		whereClauses.push(`(name LIKE '%${name}%')`);
	};

	if (car) {
		whereClauses.push(`(c.name LIKE '%${car}%')`);
	};

	if (manufacturerSearch) {
		whereClauses.push(`(m.name LIKE '%${manufacturerSearch}%')`);
	};

	if (carId) {
		whereClauses.push(`(c.id = '${carId}')`);
	};

	if (categoryId) {
		whereClauses.push(`(id = '${categoryId}')`);
	};

	if (countryId) {
		whereClauses.push(`(id = '${countryId}')`);
	};

	if (supplierId) {
		whereClauses.push(`(id = '${supplierId}')`);
	};

	if (shopId) {
		whereClauses.push(`(id = '${shopId}')`);
	};

	if (brandId) {
		whereClauses.push(`(id = '${brandId}')`);
	};

	if (commentId) {
		whereClauses.push(`(id = '${commentId}')`);
	};

	if (requestId) {
		whereClauses.push(`(id = '${requestId}')`);
	};

	if (productId) {
		whereClauses.push(`(p.id = '${productId}')`);
	};

	if (userCommented) {
		whereClauses.push(`(userId = '${userCommented}')`);
	};

	if (userrequested) {
		whereClauses.push(`(userId = '${userrequested}')`);
	};

	if (productCommented) {
		whereClauses.push(`(productId = '${productCommented}')`);
	};

	if (productName) {
		whereClauses.push(`(p.name LIKE '%${productName}%')`);
	};

	if (productBrand) {
		whereClauses.push(`(b.name LIKE '%${productBrand}%')`);
	};

	if (carName) {
		whereClauses.push(`(c.name LIKE '%${carName}%')`);
	};

	if (categoryOf) {
		whereClauses.push(`(cat.name LIKE '%${categoryOf}%')`);
	};

	if (countryOf) {
		whereClauses.push(`(co.name LIKE '%${countryOf}%')`);
	};

	if (warranty) {
		whereClauses.push(`(p.warranty LIKE '%${warranty}%')`);
	};

	if (priceFrom) {
		whereClauses.push(`(p.price >= ${priceFrom})`);
	};

	if (priceTo) {
		whereClauses.push(`(p.price <= ${priceTo})`);
	};

	return whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
};

const getCountOfTable = async ( table , query) => {
  try {
    const whereString = buildWhereClause(query);
    const sqlQuery = `
    	SELECT COUNT(*) AS total
		FROM ${table}
      	${whereString}
    `;
	const results = await promisePool.query(sqlQuery);
	return results?.[0]?.[0]?.total;
  } catch (error) {
	  throw error;
	};
};

module.exports = {
	getCountOfTable,
	buildWhereClause
}