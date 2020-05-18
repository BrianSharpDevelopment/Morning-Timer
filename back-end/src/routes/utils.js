const jwt = require('jsonwebtoken')
const config = require('../config')

exports.verifyToken = function(req, res, next) {
    var token = req.headers['x-access-token'];

    if(!token) return res.status(403).send({message: "No Token provided"});
    
    jwt.verify(token, config.JWT_SECRET, function(err, decoded) {
        if (err) return res.status(500).send({message: "Authentication failed."});

        req.userId = decoded.id;

        next();
    })
}

