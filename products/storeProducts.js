const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String,
    category: String,
    quantity: Number,
    manufacturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manufacturer"
    }
})

module.exports = mongoose.model('Product', ProductSchema)