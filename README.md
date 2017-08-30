# In House Rush

## Stack
MySQL database  
Node + Express backend  
React + Bootstrap frontend  

## Getting started
`npm install`  
You need to add a file `db.php` in your root directory with your database login info.  
`npm start`

To configure mysql:  
    CREATE DATABASE `ihr`;  
    USE `ihr`;
    CREATE TABLE people (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, firstname CHAR(25), lastname CHAR(25));
    CREATE TABLE votes (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, user CHAR(8), person INT, value INT);
    CREATE TABLE comments (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, user CHAR(8), person INT, text TEXT);
