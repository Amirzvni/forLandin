
const db = require('../db/db');
const promisePool = db.promise();
const { getCountOfTable , buildWhereClause } = require('../utils/count');
const { productJoin } = require('../utils/joins');

const create = async (id, body) => {
		return new Promise((resolve, reject) => {
		const { name , code , description , warranty , price, productBrand, carName, categoryOf, countryOf, manufacturerOf } = body;
		const insertIntoProductQuery = `INSERT INTO products (id, name, code, description, warranty, price) VALUES ('${id}' ,'${name}', '${code}','${description}', '${warranty}', '${price}')`;
    promisePool.query(insertIntoProductQuery)
      .then((results) => {
		  const insertIntoProductBrand = `INSERT INTO productbrand (productId, brandId) VALUES ('${id}' ,'${productBrand}')`;
		  console.log(insertIntoProductBrand)
        return promisePool.query(insertIntoProductBrand);
	  })
	  .then((results) => {
		const insertIntoProductCar = `INSERT INTO productcar (productId, carId) VALUES ('${id}' ,'${carName}')`;
        return promisePool.query(insertIntoProductCar); 
	  })	
	  .then((results) => {
		const insertIntoProductCategory = `INSERT INTO productcategory (productId, categoryId) VALUES ('${id}' ,'${categoryOf}')`;
        return promisePool.query(insertIntoProductCategory); 
	  })	
	  .then((results) => {
		const insertIntoProductCountry = `INSERT INTO productcountry (productId, countryId) VALUES ('${id}' ,'${countryOf}')`;
        return promisePool.query(insertIntoProductCountry); 
	  })	
	  .then((results) => {
		const insertIntoProductManufacturer = `INSERT INTO productmanufacturer (productId, manufacturerId) VALUES ('${id}' ,'${manufacturerOf}')`;
        return promisePool.query(insertIntoProductManufacturer); 
	  })	
      .then((joinResults) => {
        resolve(joinResults[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAll = async (query) => {
	const whereString = buildWhereClause(query);
	const { limit , offset } = query;
	try {
		const totalCount = await getCountOfTable(productJoin, query);
		const sqlQuery = `SELECT
    p.id AS productId,
    p.name AS productName,
    p.description,
	p.code,
	p.price,
	p.warranty,
    pb.brandId,
    b.name AS brandName,
    pc.carId,
    c.name AS carName,
    pca.categoryId,
    cat.name AS categoryName,
    pco.countryId,
    co.name AS countryName,
    pm.manufacturerId,
    m.name AS manufacturerName,
	p.created_at,
	p.updated_at
	FROM
${productJoin}
${whereString}
${limit ? `LIMIT ${limit} OFFSET ${offset}` : ''}`;
		const results = await promisePool.query(sqlQuery);
		return {
			total: totalCount,
			request : results[0]
		}
	} catch (error) {
		throw error;
	};	
};

const getOne = async (params) => {
	const whereString = buildWhereClause(params);
	try {
				const sqlQuery = `SELECT
    p.id AS productId,
    p.name AS productName,
    p.description,
	p.code,
	p.price,
	p.warranty,
    pb.brandId,
    b.name AS brandName,
    pc.carId,
    c.name AS carName,
    pca.categoryId,
    cat.name AS categoryName,
    pco.countryId,
    co.name AS countryName,
    pm.manufacturerId,
    m.name AS manufacturerName,
	p.created_at,
	p.updated_at
FROM
${productJoin} ${whereString}`;
		const results = await promisePool.query(sqlQuery);
		return results[0]
	} catch (error) {
		throw error;
	};	
};

const update = async (params, body) => {
    const { productId } = params;
    const { name, code, description, warranty, price, productBrand, carName, categoryOf, countryOf, manufacturerOf } = body;

    try {
        const updatePromises = [];

        if (productBrand) {
            const brandId = productBrand;
            const updateProductBrand = `UPDATE productbrand SET brandId = IFNULL('${brandId}', brandId) WHERE productId = '${productId}'`;
            updatePromises.push(promisePool.query(updateProductBrand));
        }

        if (carName) {
            const carId = carName;
            const updateProductCar = `UPDATE productcar SET carId = IFNULL('${carId}', carId) WHERE productId = '${productId}'`;
            updatePromises.push(promisePool.query(updateProductCar));
        }

        if (categoryOf) {
            const categoryId = categoryOf;
            const updateProductCategory = `UPDATE productcategory SET categoryId = IFNULL('${categoryId}', categoryId) WHERE productId = '${productId}'`;
            updatePromises.push(promisePool.query(updateProductCategory));
        }

        if (countryOf) {
            const countryId = countryOf;
            const updateProductCountry = `UPDATE productcountry SET countryId = IFNULL('${countryId}', countryId) WHERE productId = '${productId}'`;
            updatePromises.push(promisePool.query(updateProductCountry));
        }

        if (manufacturerOf) {
            const manufacturerId = manufacturerOf;
            const updateProductManufacturer = `UPDATE productmanufacturer SET manufacturerId = IFNULL('${manufacturerId}', manufacturerId) WHERE productId = '${productId}'`;
            updatePromises.push(promisePool.query(updateProductManufacturer));
        }

        const sqlQuery = `UPDATE products
        SET 
            name = IFNULL('${name}', name),
            code = IFNULL('${code}', code),
            description = IFNULL('${description}', description),
            warranty = IFNULL('${warranty}', warranty),
            price = IFNULL('${price}', price)
        WHERE id = '${productId}'`;

        updatePromises.push(promisePool.query(sqlQuery));

        // Wait for all promises to resolve before returning the result
        const results = await Promise.all(updatePromises);

        // Extract and return the result of the last query
        return results[updatePromises.length - 1][0];
    } catch (error) {
        throw error;
    }
};


const deleteproduct = async (params) => {
	return new Promise((resolve, reject) => {
		const { productId } = params;
		const deleteProductManufacturer = `DELETE FROM productmanufacturer WHERE productId = '${productId}'`;
    promisePool.query(deleteProductManufacturer)
      .then((results) => {
        const deleteProductCountry = `DELETE FROM productcountry WHERE productId = '${productId}'`;
        return promisePool.query(deleteProductCountry);
      })
      .then((results) => {
        const deleteProductCategory = `DELETE FROM productcategory WHERE productId = '${productId}'`;
        return promisePool.query(deleteProductCategory);
      })
      .then((results) => {
        const deleteProductCar = `DELETE FROM productcar WHERE productId = '${productId}'`;
        return promisePool.query(deleteProductCar);
      })
      .then((results) => {
        const deleteProductBrand = `DELETE FROM productbrand WHERE productId = '${productId}'`;
        return promisePool.query(deleteProductBrand);
      })
      .then((results) => {
        const deleteComments = `DELETE FROM comment WHERE productId = '${productId}'`;
        return promisePool.query(deleteComments);
      })
      .then((results) => {
        const deleteProduct = `DELETE FROM products WHERE Id = '${productId}'`;
        return promisePool.query(deleteProduct);
      })
      .then((joinResults) => {
        resolve(joinResults[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
	getAll,
	getOne,
	create,
	update,
	deleteproduct
};