const path = require('path');

const express = require('express');

const errorController = require('./controllers/error');

const mongoose = require('mongoose');

// const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('614e06ad79ccc61513aa0a3b')
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://beberiche:970409@cluster0.kr8nl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(3000);
    console.log('server is running....');
  })
  .catch((err) => console.log(err));
