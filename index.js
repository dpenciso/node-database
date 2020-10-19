const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://dpenciso:mongodbAllstars1!@cluster0.mvqj6.mongodb.net/product?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true})

app.listen(3000, () => {
    console.log('listening on port 3000')
})

const Product = require('./products/storeProducts')

app.post('/products', (req, res) => {
    Product.create({
        make: req.query.make,
        model: req.query.model,
        year: req.query.year
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

app.get('/products', (req, res) => {
    Product.find((err, products) => {
        if(err)
            console.log(err)

        res.json(products)
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