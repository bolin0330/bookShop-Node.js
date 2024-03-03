const jwt = require('jsonwebtoken');

let users = [{ "username": "bolin", "password": "1qaz2wsx" }];

const isValid = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
};

const newUser = (username, password) => {
    const matchingUsers = users.filter((user) => user.username === username && user.password === password);
    return matchingUsers.length > 0;
};

const authenticatedUser = (req, res, next) => {
    if (req.session.authorization) {
        const token = req.session.authorization.accessToken;
        jwt.verify(token, "access", (err, user) => {
            if (err) {
                return res.status(403).json({ message: "User not authenticated" });
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(403).json({ message: "User not logged in" });
    }
};


module.exports = {
    isValid,
    newUser,
    authenticatedUser,
    users
};