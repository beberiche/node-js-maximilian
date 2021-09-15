const path = require('path');

const express = require('express');
const app = express();
// const expressHbs = require('express-handlebars');

const adminRoutes = require('./routes/admin');
const shop = require('./routes/shop');

const errorController = require('./controllers/error');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app.engine(
//   'hbs',
//   expressHbs({
//     layoutsDir: `${__dirname}/views/layouts`,
//     defaultLayout: 'main-layouts',
//     extname: 'hbs',
//   })
// );
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use('/admin', adminRoutes);
app.use(shop);

app.use(errorController.get404);

app.listen(3000);
