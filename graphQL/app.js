const express = require('express');
const path = require('path');
const app = express();

const mongoose = require('mongoose');

const multer = require('multer');

const { graphqlHTTP } = require('express-graphql');
const graphSchema = require('./graphql/schema');
const graphResolver = require('./graphql/resolves');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/images`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(express.urlencoded()); // x-www-form-urlencoded
app.use(express.json()); // application/json

//cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

app.use(`${__dirname}/images`, express.static(path.join(__dirname, 'images')));

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphSchema,
    rootValue: graphResolver,
    graphiql: true,
    formatError(err) {
      if (!err.originalError) {
        return err;
      }
      const data = err.originalError.data;
      const message = err.message || 'An error occurred';
      const code = err.originalError.code || 500;
      return { message: message, status: code, data: data };
    },
  })
);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const MONGODB_URI =
  'mongodb+srv://beberiche:970409@cluster0.kr8nl.mongodb.net/rest-api?retryWrites=true&w=majority';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(8080);
    console.log('server is running....');
  })
  .catch((err) => console.log(err));
