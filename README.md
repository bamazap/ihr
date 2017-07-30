Uses [PHP-CRUD-API](https://github.com/mevdschee/php-crud-api). Many thanks.
This dependency is saved in the repo (instead of using composer) since I had to
make a change to one of the files for it to work with webpack.

`npm install`
You need to add a file `db.php` in your root directory with your database login
info.

To configure mysql:  
    CREATE DATABASE `barryam3+ihr`;  
    USE `barryam3+ihr`;  
    CREATE TABLE people (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, firstname CHAR(25), lastname CHAR(25));  
