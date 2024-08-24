const jwt = require('jsonwebtoken');
const booksDB = require("../database/booksdb.js");
const authUsers = require("../route/auth_users.js");


// Task 10: Get all books - Using async/await
async function getBookList() {
    return booksDB;
}

// Task 11: Search by ISBN - Using Promises
function getBookByISBN(isbn) {
    return new Promise((resolve, reject) => {
        const book = booksDB[isbn];
        if (book) {
            resolve(book);
        } else {
            reject(new Error("Book not found"));
        }
    });
}

// Task 12: Search by Author
async function getBooksByAuthor(author) {
    const books = Object.values(booksDB);
    return books.filter(book => book.author === author);
}

// Task 13: Search by Title
async function getBooksByTitle(title) {
    const books = Object.values(booksDB);
    return books.filter(book => book.title === title);
}

// Helper function to get book review
async function getBookReview(isbn) {
    const book = booksDB[isbn];
    return book ? book.reviews : {};
}

// Helper function to register new user
async function registerUser(username, password) {
    if (!authUsers.isValid(username)) {
        authUsers.users.push({ username, password });
        return { message: "User successfully registered" };
    } else {
        return { error: "User already exists" };
    }
}

// Helper function to login user
async function loginUser(username, password) {
    if (authUsers.newUser(username, password)) {
        return jwt.sign({ username }, 'access', { expiresIn: '1h' });
    } else {
        throw new Error("Invalid username or password");
    }
}

// Helper function to add or update book review
async function addOrUpdateReview(username, isbn, review) {
    if (booksDB[isbn]) {
        let book = booksDB[isbn];
        book.reviews[username] = review;
        return { status: 200, message: "Review successfully posted" };
    } else {
        return { status: 404, message: `ISBN ${isbn} not found` };
    }
}

// Helper function to delete book review
async function deleteReview(username, isbn) {
    if (booksDB[isbn]) {
        let book = booksDB[isbn];
        delete book.reviews[username];
        return { status: 200, message: "Review successfully deleted" };
    } else {
        return { status: 404, message: `ISBN ${isbn} not found` };
    }
}

module.exports = {
    getBookList,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle,
    getBookReview,
    registerUser,
    loginUser,
    addOrUpdateReview,
    deleteReview
};