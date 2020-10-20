const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 3000

require('dotenv').config();

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(`mongodb+srv://dpenciso:${process.env.PASSWORD}@cluster0.mvqj6.mongodb.net/product?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true})

const Product = require('./products/storeProducts')
const Manufacturer = require('./products/productManufacturer')

app.post('/products', (req, res) => {
    Product.create({
        name: req.query.name,
        category: req.query.category,
        quantity: req.query.quantity,
        manufacturer: req.query.manufacturerId
    }, (err, products) => {
        if(err)
            console.log(err)

        Product.find((err, products) => {
            if(err)
                console.log(err)

            res.json(products)
        })
    })
})

app.post('/manufacturers', (req, res) => {
    Manufacturer.create({
        name: req.query.name,
        location: req.query.location,
    }, (err, manufacturers) => {
        if(err)
            console.log(err)

        Manufacturer.find((err, manufacturers) => {
            if(err)
                console.log(err)

            res.json(manufacturers)
        })
    })
})

app.get('/products', (req, res) => {
    Product.find((err, products) => {
        if(err)
            console.log(err)

        res.json(products)
    })
})

app.get('/products/byManufacturer', (req, res) => {
    Product.find({ manufacturer: req.query.manufacturerId },(err, products) => {
        if(err)
            console.log(err)

        res.json(products)
    })
})

app.get('/manufacturers', (req, res) => {
    Manufacturer.find((err, manufacturers) => {
        if(err)
            console.log(err)

        res.json(manufacturers)
    })
})

app.put('/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        product.update(req.query, (err, products) => {
            if(err)
            console.log(err)

        Product.find((err, products) => {
                if(err)
                    console.log(err)

                res.json(products)
            })
        })
    })
})

app.put('/manufacturers/:id', (req, res) => {
    Manufacturer.findById(req.params.id, (err, manufacturer) => {
        manufacturer.update(req.query, (err, manufacturers) => {
            if(err)
            console.log(err)

        Manufacturer.find((err, manufacturers) => {
                if(err)
                    console.log(err)

                res.json(manufacturers)
            })
        })
    })
})


app.delete('/products/:id', (req, res) => {
    Product.remove({
        _id: req.params.id
    }, (err, products) => {
        if(err)
            console.log(handleError(err))
        Product.find((err, products) => {
            if(err)
                console.log(handleError(err))
            res.json(products)
        })
    })
})

app.delete('/manufacturers/:id', (req, res) => {
    Manufacturer.remove({
        _id: req.params.id
    }, (err, manufacturers) => {
        if(err)
            console.log(handleError(err))
        Manufacturer.find((err, manufacturers) => {
            if(err)
                console.log(handleError(err))
            res.json(manufacturers)
        })
    })
})

app.listen(port, () => console.log(`Listening on port ${port}...`))