// const fs = require('fs');
import fs from 'fs/promises';
import path, { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const resHandler = (req, res, next) => {
  fs.readFile('my-page.html', 'utf8')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
  // res.sendFile(path.join(__dirname, 'my-page.html'));
};

// moudule.exports = resHandler
// export default resHandler;
