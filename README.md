# In House Rush

## Purpose
Every fall, MacGregor House at MIT runs what is known as "In House Rush" (IHR). During IHR, first-year students visit each of the nine sections of the dorm ("entries") and mingle with the people who already live there. At the end of IHR, the first-year students rank the entries in order of preference, and the returning students rate each freshman on a numerical scale. This information is fed into a marriage algorithm to produce rooming assignments.  

Historically, I found that taking notes on the 100+ first-year students was difficult, and aggregating entry opinion at the end of the night was a grueling process. Therefore, I deciced to create this app to solve these problems.  

This app allows names of first-year students to be entered once and appear on everyone in the entry's devices. Entry residents can search people by name, jot down notes, and give a numerical up or down vote. These votes are summed and displayed in a table to help with the assigning of ratings at the end of the night.

## Demo
You can test out the app [here](https://dentry-ihr.herokuapp.com) (log in as `testuser`).

## Design Decisions
Due to the specific use case of the app, it was designed with mobile in mind. Although it does not match the rating system used by the house, a +/- 2 system was chosen to mimic the 1 or 2 thumbs up or down system that was used in the past.

## Code Structure
Front-End code is in `src`. React and SASS are used and transpiled with Webpack.
Back-End code is in `routes`, `uitls`, and `app.js`. Node is used with Express.
MySQL is used as the database because MySQL is free through MIT.

## Caveats
While I had been thinking about this project for a while and began it over the summer, most of the work was done in the days leading up to IHR 2017. Thus, only one entry is unsupported, security was mostly neglected, and the code is not my best work (although I am perhaps most proud of this project due to the palpable difference it made when we used it).

## Getting started
`npm install`  
You need to add a file `db.php` in your root directory or set environment variables with your database login info.
`npm start` in one terminal  
`npm run dev` in another

Do `npm run lint` before commiting.  

To configure mysql:  
    CREATE DATABASE `ihr`;  
    USE `ihr`;
    CREATE TABLE users (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, username CHAR(8));
    CREATE TABLE people (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, firstname CHAR(25), lastname CHAR(25));
    CREATE TABLE votes (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, user CHAR(8), person INT, value INT);
    CREATE TABLE comments (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, user CHAR(8), person INT, text TEXT);
