const path = require('path');

const express = require('express');

const errorController = require('./controllers/error');
const db = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// execute ./util/database.js => return pool.promise()
// db.execute('SELECT * FROM products')
//   .then((result) => {
//     console.log(result[0]);
//   })
//   .catch((err) => {
//     console.log('Error : ', err);
//   });

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
