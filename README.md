# Colorado Ballet Academy Information Package

https://cba-app.firebaseapp.com

The objective of this project is to help parents and students of the CBA obtain information on the upcoming activities related to The Nutcracker production. Originally, the CBA staff provides parents with a booklet guide that contains detailed information about cast members, scenes, and performance dates. The parent's guide presents data written in Word and Excel, so the parents have to flip through pages to look for their individual pertinent information. With the use of a relational database, I was able to present the relevant upcoming activity for a single student or many selected students.

Moreover, with the use of persistent data, a logged in user can save the name of a specific student to get even easier access to individual information.

The front-end of this application, deployed in Firebase, uses Angular2. The app can make GET, POST, PUT and DELETE requests to the decoupled backend that uses Express and PostgreSQL. The backend was deployed in a Heroku server.

The repo of the back-end code is:

https://github.com/oswaldosalazar/CB-NUT-schedule2016

This project uses:

Front-end:
* Angular 2 with Angular CLI
* TypeScript
* Material Design Lite (responsive and mobile-ready)
* Social login with Facebook SDK
* Firebase

Back-end:
* Express
* PostgreSQL
* Knex.js
* Heroku
