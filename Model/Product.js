const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for Product schema
let Products = new Schema({
 Name: {
 type: String
 },
 ID: {
 type: String
 },
 Description: {
 type: String
 },
 Price: {
 type: Number
 }
},{
 collection: 'Products'
});

module.exports = mongoose.model('Products', Products);


