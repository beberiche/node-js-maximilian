// const mongoDB = require('mongodb');
// const { getDb } = require('../util/database');

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongoDB.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   // insert or update !
//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       dbOp = db
//         .collection('products')
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         // console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static deleteItem(prodId, userId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new mongoDB.ObjectId(prodId) })
//       .then((item) => {
//         const updatedItems = db.collection('users').updateOne(
//           { _id: new mongoDB.ObjectId(userId) },
//           {
//             $pull: {
//               'cart.items': { productId: new mongoDB.ObjectId(prodId) },
//             },
//           }
//         );
//       })
//       .then(() => {
//         console.log('Cart Item Deleted');
//       })
//       .then(() => {
//         console.log('Product Deleted');
//       })
//       .catch((err) => console.log(err));
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then((products) => {
//         // console.log(products);
//         return products;
//       })
//       .catch((err) => console.log(err));
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .findOne({ _id: new mongoDB.ObjectId(prodId) })
//       .then((product) => {
//         // console.log(product);
//         return product;
//       })
//       .catch((err) => console.log(err));
//   }

//   // static update(prodId) {
//   //   const db = getDb()
//   //   return db.collection('products').update({_id: new mongoDB.ObjectId(prodId)})
//   // }
// }

// module.exports = Product;
