const path = require('path');

const express = require('express');

const errorController = require('./controllers/error');

const mongoose = require('mongoose');

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findOne()
    .then((user) => {
      req.user = user;
      // console.log(`log in was success. hello ${user.name}😀`);
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://beberiche:970409@cluster0.kr8nl.mongodb.net/shop?retryWrites=true&w=majority'
  )
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'beberiche',
          email: 'beberiche@test.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(3000);
    console.log('server is running....');
  })
  .catch((err) => console.log(err));
