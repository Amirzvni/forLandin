
const carManufacturerJoin = `
  car c LEFT JOIN manufacturerCar mc ON c.id = mc.carId LEFT JOIN manufacturer m ON mc.manufacturerId = m.id
`;
const userTransactionJoin = `
  transaction t JOIN userTransaction ut ON t.id = ut.transactionId JOIN users u ON ut.userId = u.id 
`;
const productJoin = `
  products p LEFT JOIN productBrand pb ON p.id = pb.productId LEFT JOIN brand b ON pb.brandId = b.id LEFT JOIN productCar pc ON p.id = pc.productId LEFT JOIN car c ON pc.carId = c.id LEFT JOIN productCategory pca ON p.id = pca.productId LEFT JOIN category cat ON pca.categoryId = cat.id LEFT JOIN productCountry pco ON p.id = pco.productId LEFT JOIN country co ON pco.countryId = co.id LEFT JOIN productManufacturer pm ON p.id = pm.productId LEFT JOIN manufacturer m ON pm.manufacturerId = m.id
`;

module.exports = {
  carManufacturerJoin,
  userTransactionJoin,
  productJoin
}