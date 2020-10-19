const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number
})

module.exports = mongoose.model('Product', ProductSchema)