const express = require('express');
const publicRouter = require('./route/public_users.js');
const registeredRouter = require('./route/registered_users.js');

const app = express();
const PORT = 5000;

app.use(express.json());

// Public routes
app.use('/public', publicRouter);

// Registered users routes
app.use('/registered', registeredRouter);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));