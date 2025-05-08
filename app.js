const express = require('express')
const { connectToDb, getDb } = require('./db')

// init app & middleware
const app = express()

// db connection
let db
connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('connected to db & listening on port 3000')
        })
        db = getDb()
    }
})

// routes
app.get('/books', (req, res) => {
    let books = []

    db.collection('books')
        .find()
        .sort({ author: 1})
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books)
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the documents' })
        })
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id
    let book = null

    db.collection('books')
        .find({ _id: new ObjectId(id) })
        .forEach(b => book = b)
        .then(() => {
            if (book) {
                res.status(200).json(book)
            } else {
                res.status(404).json({ error: 'Book not found' })
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the document' })
        })
})