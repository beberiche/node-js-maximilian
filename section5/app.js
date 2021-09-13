const path = require('path');

const express = require('express');
const app = express();

const adminRouter = require('./routes/adminRoutes');
const shopRouter = require('./routes/shopRoutes');

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use(shopRouter);

app.all('*', (req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);

// Assignment 과제
// app.use('/users', (req, res, next) => {
//   res.send('<h1>Here is "users" page</h1>');
// });

// app.use('/', (req, res, next) => {
//   res.send('<h1>Here is "initializing" page </h1>');
// });

// app.listen(3000);
