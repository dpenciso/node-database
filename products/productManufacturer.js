const mongoose = require('mongoose')

const ManufacturerSchema = new mongoose.Schema({
    name: String,
    location: String
})

module.exports = mongoose.model('Manufacturer', ManufacturerSchema)