const path = require('path');

const express = require('express');
const app = express();
// const expressHbs = require('express-handlebars');

const admin = require('./routes/admin');
const shop = require('./routes/shop');

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

app.use('/admin', admin.routes);
app.use(shop);

app.all('*', (req, res, next) => {
  res
    .status(404)
    .render('404', { pageTitle: 'Page Not Found', path: 'not/found' });
});

app.listen(3000);
