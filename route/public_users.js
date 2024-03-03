const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const { getBookList, getBookByISBN, getBooksByAuthor, getBooksByTitle, getBookReview, registerUser } = require("../utils/utils.js");

const publicRouter = express.Router();

// Task 1: Get the book list available in the shop
publicRouter.get('/books', async (req, res) => {
    try {
        const bookList = await getBookList();
        res.json(bookList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Task 2: Get the books based on ISBN
publicRouter.get('/books/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    try {
        const book = await getBookByISBN(isbn);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Task 3: Get all books by Author
publicRouter.get('/books/author/:author', async (req, res) => {
    const author = req.params.author;
    try {
        const books = await getBooksByAuthor(author);
        if (books.length > 0) {
            res.json(books);
        } else {
            res.status(404).json({ message: "No books found by this author" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Task 4: Get all books based on Title
publicRouter.get('/books/title/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const books = await getBooksByTitle(title);
        if (books.length > 0) {
            res.json(books);
        } else {
            res.status(404).json({ message: "No books found with this title" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Task 5: Get book Review
publicRouter.get('/books/review/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    try {
        const bookReview = await getBookReview(isbn);
        res.json(bookReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Task 6: Register New user
publicRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (username && password) {
            registerUser(username, password);
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(400).json({ message: "Username or password missing." });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
});


module.exports = publicRouter;