Uses [PHP-CRUD-API](https://github.com/mevdschee/php-crud-api). Many thanks.

`composer install`
`npm install`
You need to add a file `db.php` in your root directory with your database login
info.

You need to edit `vendor/mevdschee/php-crud-api/lib/php_crud_api_transform.js`  
On line 1, add `export default` in front of `function`  
On line 34, add `var` in front of `tree`  

To configure mysql:  
    CREATE DATABASE `barryam3+ihr`;  
    USE `barryam3+ihr`;  
    CREATE TABLE people (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, firstname CHAR(25), lastname CHAR(25));  
