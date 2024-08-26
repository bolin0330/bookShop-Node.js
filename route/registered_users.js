const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const { newUser, authenticatedUser } = require('./auth_users');
const { addOrUpdateReview, deleteReview } = require('../utils/utils');

const registeredRouter = express.Router();


// Task 7: Login as a Registered user
registeredRouter.use(session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

registeredRouter.post('/login', (req, res) => {
    console.log("login: ", req.body);
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            throw new Error("Username or password missing.");
        }

        if (newUser(username, password)) {
            const accessToken = jwt.sign({
                data: password
            }, 'access', { expiresIn: '1h' });

            req.session.authorization = {
                accessToken,
                username
            };
            return res.status(200).json({ message: "User successfully logged in" });
        } else {
            return res.status(401).json({ message: "Invalid login credentials. Please check your username and password" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error." });
    }
});


// Task 8: Add/Modify a book review
registeredRouter.use('/books/review/*', authenticatedUser);

registeredRouter.put('/books/review/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;
    const username = req.session.authorization.username;
    console.log("add review: ", req.params, req.body, req.session);

    try {
        const result = await addOrUpdateReview(username, isbn, review);
        return res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.error("Error adding or updating review:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


// Task 9: Delete book review added by that particular user
registeredRouter.delete('/books/review/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization.username;

    try {
        const result = await deleteReview(username, isbn);
        return res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.error("Error deleting review:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = registeredRouter;