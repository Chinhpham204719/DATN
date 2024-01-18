const User = require('../model/user')
const jwt = require('jsonwebtoken')


// Middleware function for authentication
// Verifies the provided authentication token, checks if the user exists, and attaches user information and token to the request object
const auth = async (req, res, next) => {
    try {
        // Extracts the token from the 'Authorization' header
        const token = req.header('Authorization').replace('Bearer ', '');
        
        // Verifies the token using the secret key 'iot2024'
        const decoded = jwt.verify(token, 'iot2024');
        
        // Finds the user based on the decoded token and token match
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        
        if (!user) {
            throw new Error();
        }
        
        // Attaches the token and user information to the request object
        req.token = token;
        req.user = user;
        
        // Calls the next middleware or route handler
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please provide authentication.' });
    }
};

module.exports = auth
