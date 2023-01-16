
// Importing important packages
const express = require('express');

// Using express and routes
const app = express();
const ProductRoute = express.Router();

// Product module which is required and imported
let ProductModel = require('../Model/Product');

// To Get List Of Product
ProductRoute.route('/').get(function (req, res) {
    ProductModel.find(function (err, product) {
 if (err) {
 console.log(err);
 }
 else {
 res.json(product);
 }
 });
});

// To Add New Product
ProductRoute.route('/addProduct').post(function (req, res) {
 let product = new ProductModel(req.body);
 product.save()
 .then(game => {
 res.status(200).json({ 'product': 'Product Added Successfully' });
 })
 .catch(err => {
 res.status(400).send("Something Went Wrong");
 });
});

// To Get Product Details By Product ID
ProductRoute.route('/editProduct/:id').get(function (req, res) {
    console.log(req)
 let id = req.params.id;
 ProductModel.findById(id, function (err, product) {
 res.json(product);
 });
});

// To Update The Product Details
ProductRoute.route('/updateProduct/:id').post(function (req, res) {
 ProductModel.findById(req.params.id, function (err, Product) {
 if (!Product)
 return next(new Error('Unable To Find Product With This Id'));
 else {
 Product.Name = req.body.Name;
 Product.ID = req.body.ID;
 Product.Description = req.body.Description;
 Product.Price = req.body.Price;

 Product.save().then(emp => {
 res.json('Product Updated Successfully');
 })
 .catch(err => {
 res.status(400).send("Unable To Update Product");
 });
 }
 });
});

// To Delete The Product
ProductRoute.route('/deleteProduct/:id').get(function (req, res) {
 ProductModel.findByIdAndRemove({ _id: req.params.id }, function (err, Product) {
 if (err) res.json(err);
 else res.json('Product Deleted Successfully');
 });
});

module.exports = ProductRoute;
