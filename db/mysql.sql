CREATE DATABASE delali CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE delali;

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    otp INT(6),
    otpExpiration TIMESTAMP,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    phoneNumber VARCHAR(20) NOT NULL,
    state VARCHAR(50),
    city VARCHAR(50),
    locale VARCHAR(50),
    address TEXT,
    plate VARCHAR(20),
    unit VARCHAR(20),
    zipCode VARCHAR(10),
    accessLevel ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE users
ADD CONSTRAINT unique_phoneNumber UNIQUE (phoneNumber)

ALTER TABLE users
    ADD CONSTRAINT check_accessLevel CHECK (accessLevel IN ('admin', 'user'));

ALTER TABLE users
ADD COLUMN profilePicture VARCHAR(255);


CREATE TABLE IF NOT EXISTS category (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE,
    description TEXT,
    price INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS productCategory (
    productId VARCHAR(50),
    categoryId VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (productId, categoryId),
    FOREIGN KEY (productId) REFERENCES products(id),
    FOREIGN KEY (categoryId) REFERENCES category(id)
);


-- CREATE TABLE IF NOT EXISTS transaction (
--     id VARCHAR(50) PRIMARY KEY,
--     status ENUM('success', 'fail' , 'pend') NOT NULL,
--     amount INT UNSIGNED NOT NULL,
--     type ENUM('cash', 'bnpl') NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );

-- CREATE TABLE IF NOT EXISTS userTransaction (
--     userId VARCHAR(50),
--     transactionId VARCHAR(50),
--     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     PRIMARY KEY (userId, transactionId),
--     FOREIGN KEY (userId) REFERENCES users(id),
--     FOREIGN KEY (transactionId) REFERENCES transaction(id)
-- );

-- CREATE TABLE IF NOT EXISTS transactionProduct (
--   transactionId VARCHAR(50),
--   productId VARCHAR(50), 
--   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   PRIMARY KEY (transactionId , productId),
--   FOREIGN KEY (transactionId) REFERENCES transaction(id)
-- );


CREATE TABLE IF NOT EXISTS service (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    path VARCHAR(255) NOT NULL,
    type ENUM('admin', 'share') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- CREATE TABLE IF NOT EXISTS comment (
--     id VARCHAR(50) PRIMARY KEY,
--     text VARCHAR(255) NOT NULL,
--     rate ENUM('1', '2' , '3' , '4' , '5') NOT NULL,
--     userId VARCHAR(50),
--     productId VARCHAR(50),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     FOREIGN KEY (userId) REFERENCES users(id),
--     FOREIGN KEY (productId) REFERENCES products(id)
-- );


-- -- indexes
-- ALTER TABLE users
--     ADD INDEX idx_accessLevel (accessLevel),
--     ADD INDEX idx_phoneNumber (phoneNumber),
--     ADD INDEX idx_state (state);


-- ALTER TABLE suppliers
--     ADD INDEX idx_name (name),
--     ADD INDEX idx_state (state),
--     ADD INDEX idx_city (city);

-- ALTER TABLE shops
--     ADD INDEX idx_name (name),
--     ADD INDEX idx_state (state),
--     ADD INDEX idx_city (city);

-- ALTER TABLE products
--     ADD INDEX idx_name (name),
--     ADD INDEX idx_price (price),
--     ADD INDEX idx_warranty (warranty);

-- ALTER TABLE comment
--     ADD INDEX idx_userId (userId),
--     ADD INDEX idx_productId (productId),
--     ADD INDEX idx_rate (rate);

-- ALTER TABLE productBrand
--     ADD INDEX idx_productId (productId),
--     ADD INDEX idx_brandId (brandId);

-- ALTER TABLE productManufacturer
--     ADD INDEX idx_productId (productId),
--     ADD INDEX idx_manufacturerId (manufacturerId);

-- ALTER TABLE productCar
--     ADD INDEX idx_productId (productId),
--     ADD INDEX idx_carId (carId);

-- ALTER TABLE productCategory
--     ADD INDEX idx_productId (productId),
--     ADD INDEX idx_categoryId (categoryId);

-- ALTER TABLE productCountry
--     ADD INDEX idx_productId (productId),
--     ADD INDEX idx_countryId (countryId);



-- -- inserts
-- -- users
-- INSERT INTO users 
-- (`id`, `firstName`, `lastName` , `phoneNumber` , `state` , `city` , `locale` , `address` , `plate` , `unit` , `zipCode` , `accessLevel`)
-- VALUES 
-- ('a77b6e11-ffad-4ca4-bac5-fd4e24c74d8d' , 'Amir' , 'Rezvani' , '09123624392' , 'alborz' , 'karaj' , 'mehrshahr' , '13om zibal' , 0 , '2' , '3333333333' , 'admin');
-- INSERT INTO users 
-- (`id`, `firstName`, `lastName` , `phoneNumber` , `state` , `city` , `locale` , `address` , `plate` , `unit` , `zipCode` , `accessLevel`)
-- VALUES 
-- ('9afdc04a-0b26-47db-bd47-796a0b348de2' , 'Amir' , 'User' , '09123624392' , 'alborz' , 'karaj' , 'mehrshahr' , '13om zibal' , 0 , '2' , '3333333333' , 'user');

-- -- suppliers
-- INSERT INTO suppliers 
-- (`id`, `name`, `phoneNumber` , `landNumber` , `state` ,  `city` , `locale` , `address` , `plate` , `unit` , `zipCode`)
-- VALUES 
-- ('9673e2f4-16bf-4882-85db-24524579a646' , 'test' , '09919599570' , '09123624392' , 'alborz' , 'karaj' , 'mehrshahr' , '13om zibal' , 0 , '2' , '3333333333');
-- INSERT INTO suppliers 
-- (`id`, `name`, `phoneNumber` , `landNumber` , `state` ,  `city` , `locale` , `address` , `plate` , `unit` , `zipCode`)
-- VALUES 
-- ('cc64b43e-efb6-4673-9d5c-5d18cfa3a5b4' , 'test2' , '09919599585' , '09121111111' , 'alborz' , 'karaj' , 'mehrshahr' , '13om zibal' , 0 , '2' , '3333333333');

-- -- shops
-- INSERT INTO shops 
-- (`id`, `name`, `phoneNumber` , `landNumber` , `state` ,  `city` , `locale` , `address` , `plate` , `unit` , `zipCode`)
-- VALUES 
-- ('9673e2f4-16bf-4882-85db-24524579a646' , 'test' , '09919599570' , '09123624392' , 'alborz' , 'karaj' , 'mehrshahr' , '13om zibal' , 0 , '2' , '3333333333');

-- -- brand
-- INSERT INTO brand 
-- (`id`, `name`)
-- VALUES 
-- ('5404de29-f325-438e-a539-2f2a6ebe389a' , 'Ezam' );
-- INSERT INTO brand 
-- (`id`, `name`)
-- VALUES 
-- ('9673e2f4-16bf-4882-85db-24524579a646' , 'اعظام' );

-- -- manufacturer
-- INSERT INTO manufacturer 
-- (`id`, `name`)
-- VALUES 
-- ('4a0eb7c3-dbc6-47b2-b704-73b7787abbf4' , 'toyota' );
-- INSERT INTO manufacturer 
-- (`id`, `name`)
-- VALUES 
-- ('d0937fd5-cf9d-475b-a58b-1cdf4ae24f4d' , 'peugeot' );

-- -- car
-- INSERT INTO car 
-- (`id`, `name`)
-- VALUES 
-- ('3e4a9c82-fc22-47f2-8a8d-5a5a1bfea786' , 'landcruser' );

-- -- manufacturerCar
-- INSERT INTO manufacturerCar 
-- (`manufacturerId`, `carId`)
-- VALUES 
-- ('4a0eb7c3-dbc6-47b2-b704-73b7787abbf4' , '3e4a9c82-fc22-47f2-8a8d-5a5a1bfea786' );

-- -- category
-- INSERT INTO category
-- (`id` , `name`)
-- VALUES
-- ('981a4a2e-667b-47e7-920b-1a57766842c2' , 'engine parts');

-- -- country
-- INSERT INTO country
-- (`id` , `name`)
-- VALUES
-- ('9fe90f55-c5dc-48c9-8ed5-ec5efa05bd78' , 'china');

-- -- products
-- INSERT INTO products
-- (`id` , `name` , `code` , `description` , `price` , `warranty` )
-- VALUES
-- ('4727b972-35e3-43a6-8f37-8649ebdbe993' , 'دیسک و صفحه' , '1377' , 'به جان مادرم بهترین دیسک وصفحس باور کن' , 1000000 , true );

-- --pruductBrand
-- INSERT INTO productbrand 
-- (`productId`, `brandId`)
-- VALUES 
-- ('4727b972-35e3-43a6-8f37-8649ebdbe993' , '5404de29-f325-438e-a539-2f2a6ebe389a' );

-- -- productManufacturer
-- INSERT INTO productManufacturer 
-- (`productId`, `manufacturerId`)
-- VALUES 
-- ('4727b972-35e3-43a6-8f37-8649ebdbe993' , '4a0eb7c3-dbc6-47b2-b704-73b7787abbf4' );

-- -- productCar
-- INSERT INTO productCar 
-- (`productId`, `carId`)
-- VALUES 
-- ('4727b972-35e3-43a6-8f37-8649ebdbe993' , '3e4a9c82-fc22-47f2-8a8d-5a5a1bfea786' );

-- -- productCategory
-- INSERT INTO productCategory 
-- (`productId`, `categoryId`)
-- VALUES 
-- ('4727b972-35e3-43a6-8f37-8649ebdbe993' , '981a4a2e-667b-47e7-920b-1a57766842c2' );

-- -- productCountry
-- INSERT INTO productCountry
-- (`productId`, `countryId`)
-- VALUES 
-- ('4727b972-35e3-43a6-8f37-8649ebdbe993' , '9fe90f55-c5dc-48c9-8ed5-ec5efa05bd78' );

-- -- transaction
-- INSERT INTO transaction
-- (`id`, `status` , `amount` , `type` )
-- VALUES 
-- ('8225de02-58db-4a22-9893-12da1e48a473' , 'success' , '1000' , 'cash' );

-- -- userTransaction
-- INSERT INTO userTransaction
-- (`userId`, `transactionId` )
-- VALUES 
-- ('a77b6e11-ffad-4ca4-bac5-fd4e24c74d8d' , '8225de02-58db-4a22-9893-12da1e48a473' );
-- INSERT INTO userTransaction
-- (`userId`, `transactionId` )
-- VALUES 
-- ('110b844f-976a-4089-8a20-9e68236967b1' , '07ca6667-0577-4e98-9f16-fb9da7078cd3' );

-- -- transactionProduct
-- INSERT INTO transactionProduct
-- (`transactionId` , `productId` )
-- VALUES 
-- ('8225de02-58db-4a22-9893-12da1e48a473' , '4727b972-35e3-43a6-8f37-8649ebdbe993');

-- -- request
-- INSERT INTO request
-- (`id` , `userId`, `parts`)
-- VALUES 
-- ('6f979972-5188-44d5-885f-3bf85a731426' , 'a77b6e11-ffad-4ca4-bac5-fd4e24c74d8d' ,  '{"part1": "description1", "part2": "description2"}');

-- service
INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('ae8bfb77-fd73-43c9-a886-1a68adc8a14e' , 'login' ,  '/user/v1.0/login' , 'share');
INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('fa418d5a-cef2-47fc-bf85-041356514bb5' , 'Admin login' ,  '/user/v1.0/adminlogin' , 'admin');
INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('956207fb-0f6e-477a-9bef-9aed6e72a7dc' , 'Verify Users' ,  '/user/v1.0/verify' , 'share');
INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('4205c878-7efb-4f8b-8215-c42d7794fa84' , 'Resend Otp' ,  '/user/v1.0/resendotp' , 'share');
INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('6e3768c3-aeda-4abe-a727-986f6f43048c' , 'User Lists' ,  '/user/v1.0/list' , 'admin');
INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('21fdf119-de5e-4c1c-a258-029f1c3e2c3b' , 'get one user' ,  '/user/v1.0/get/:userId' , 'admin');

INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('ee7c44f5-6516-4ec3-b328-67cba2feea37' , 'update one user' ,  '/user/v1.0/update/:userId' , 'admin');
INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('3ff125fe-3257-4e9b-8a4d-5d2e0342725d' , 'update user profile' ,  '/user/v1.0/update/profile/:userId' , 'share');
INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('2efa4a15-e2f3-4e17-9553-b84f9ad3195e' , 'delete one user' ,  '/user/v1.0/delete/:userId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('ecc645c2-c7c6-4950-9685-337c35a157ad' , 'GET all transactions' ,  '/transactions/v1.0/list' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('101dca2d-c62d-4657-a2ef-e084f2f3c59b' , 'GET One transactions' ,  '/transactions/v1.0/get/:transactionId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('9af1fd74-9a92-4040-ade4-49229cfc12a7' , 'GET all manufacturers' ,  '/manufacturer/v1.0/list' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('56e83220-8dc2-4ee0-8d27-f7b8db3226b3' , 'GET one manufacturers' ,  '/manufacturer/v1.0/get/:manufacturerId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('8ca5f009-89fe-4f1e-8b58-b008f3f8e33f' , 'POST one manufacturers' ,  '/manufacturer/v1.0/create' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('a324e04e-b726-44c7-b24b-fc2d897f1521' , 'UPDATE one manufacturers' ,  '/manufacturer/v1.0/update/:manufacturerId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('32db4bd1-7e7d-49e7-a594-52eb4b8c9345' , 'DELETE one manufacturers' ,  '/manufacturer/v1.0/delete/:manufacturerId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('5a147c07-5301-4e44-a6df-8fe2d98feee4' , 'GET all manufacturers' ,  '/car/v1.0/list' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('4ea34bb1-c3a7-4a0e-9d14-c4c18ee615f8' , 'GET one cars' ,  '/car/v1.0/get/:carId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('5849cc0a-d718-424b-a8e5-95114ffb66fe' , 'POST one cars' ,  '/car/v1.0/create' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('98fdad11-cb47-49c9-b88c-8a728e65cc28' , 'DELETE one cars' ,  '/car/v1.0/delete/:carId' , 'admin');
INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('4a03912a-f5de-4d2b-a910-80c60b28cf54' , 'GET all categories' ,  '/category/v1.0/list' , 'share');
INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('4acabe66-f0af-46f6-b818-54e86982fcb5' , 'POST one category' ,  '/category/v1.0/create' , 'admin');
INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('b1c186aa-5d8b-4418-99d1-28e6f0a8e021' , 'DELETE one category' ,  '/category/v1.0/delete/:categoryId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('ac8b8d22-4ae4-4328-8e44-b0fd3fc31a53' , 'GET all countries' ,  '/country/v1.0/list' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('c2c3f825-0289-48d3-9606-69e719473ab9' , 'POST one country' ,  '/country/v1.0/create' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('555e794f-afad-4ca4-9be8-5b04b3806bce' , 'DELETE one country' ,  '/country/v1.0/delete/:categoryId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('a2b14511-d6a2-4ccc-b89a-0ac42a7763e1' , 'GET all suppliers' ,  '/supplier/v1.0/list' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('814914b2-9247-4394-9cad-d38777b0effe' , 'GET one supplier' ,  '/supplier/v1.0/get/:supplierId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('5d4a488e-8363-411e-974f-8a6138ea18bd' , 'POST one supplier' ,  '/supplier/v1.0/create' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('47c0b659-27e1-478f-9456-7105917c7257' , 'update one supplier' ,  '/supplier/v1.0/update/:supplierId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('411914d2-84e0-46b9-a5f5-ef91387d81b4' , 'DELETE one supplier' ,  '/supplier/v1.0/delete/:supplierId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('886010b7-b41a-4bd1-870c-f6a5f04bff44' , 'GET all shops' ,  '/shops/v1.0/list' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('f3184a8f-8583-4ada-9646-07cb7e1e33b9' , 'GET one shops' ,  '/shops/v1.0/get/:shopId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('5284044c-737f-4348-8cbe-4032c569756f' , 'POST one shops' ,  '/shops/v1.0/create' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('bdfc3e75-871a-4395-833e-da16d8a78d31' , 'update one shops' ,  '/shops/v1.0/update/:shopId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('fc5fb9c1-da6d-4097-b3e3-dceac773f43a' , 'DELETE one shops' ,  '/shops/v1.0/delete/:shopId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('e3c61d77-beac-437d-9355-a17301d1e4e5' , 'GET all brands' ,  '/brand/v1.0/list' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('76f88442-1f11-4ff3-b5b5-8d68fd89271c' , 'POST one brand' ,  '/brand/v1.0/create' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('b64372d0-2e46-43bc-ad4a-e351d487bc29' , 'DELETE one brand' ,  '/brand/v1.0/delete/:brandId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('03f6f915-2daf-4d4b-a07d-cd6dede583b4' , 'GET all comments' ,  '/comment/v1.0/list' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('319801f7-db2c-46a1-a761-1c9aba386111' , 'GET one comments' ,  '/comment/v1.0/get/:commentId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('34499b8e-d309-48c0-b0cb-b4181953938d' , 'POST one comments' ,  '/comment/v1.0/create' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('eeeebee1-84dd-4d52-87b6-937e828ddfb2' , 'DELETE one comments' ,  '/comment/v1.0/delete/:commentId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('a52b5b10-9f39-4951-85b4-fedc7f165c99' , 'GET all request' ,  '/request/v1.0/list' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('50a167ce-3981-4e98-bd1b-3e90c4873f3e' , 'GET one requests' ,  '/request/v1.0/get/:requestId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('594f77c4-7273-4429-aeb7-b61e5cf8e5fb' , 'POST one requests' ,  '/request/v1.0/create' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('9ae1feee-459c-429a-b969-bbb6d1986878' , 'update one requests' ,  '/request/v1.0/update/:requestId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('dc6fedcf-676f-4325-b072-d2dc28e3f8a9' , 'GET all products' ,  '/product/v1.0/list' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('a835c0ed-8cfe-4ef9-b7cd-87f7ff6c1d07' , 'GET one products' ,  '/product/v1.0/get/:productId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('412d8074-5e77-4924-ac3d-cb70a839b40d' , 'POST one products' ,  '/product/v1.0/create' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('f2d41526-cdba-43b4-bf89-bf2b3a9f2d74' , 'update one products' ,  '/product/v1.0/update/:productId' , 'admin');
-- INSERT INTO service (`id` , `name`, `path` , `type`) VALUES ('6dc20344-bb81-452a-837f-fd04815ab911' , 'DELETE one product' ,  '/product/v1.0/delete/:productId' , 'admin');

-- -- comment
-- INSERT INTO comment
-- (`id` , `text`, `rate` , `userId` , `productId`)
-- VALUES 
-- ('9849650b-628a-413d-a7e2-e67aafda319f' , 'بسیار عالی' ,  '5' , '9afdc04a-0b26-47db-bd47-796a0b348de2' , '4727b972-35e3-43a6-8f37-8649ebdbe993');

