const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    Discount: { type: String, required: true },
    premiumMemberDiscount: { type: String, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
