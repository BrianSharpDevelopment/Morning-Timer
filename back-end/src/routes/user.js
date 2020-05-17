const bcrypt = require('bcrypt');
const table_names = require('./../constants/table_names');
var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'testing',
      database : 'morning_timer'
    }
});

const saltRounds = 10;

exports.register = async function(req, res) {
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;

    if (!password) {
        res.send({code: 400, message: "Missing required parameter: password"})
        return;
    }

    if (!email) {
        res.send({code: 400, message: "Missing required parameter: email"})
        return;
    }

    if (!name) {
        res.send({code: 400, message: "Missing required parameter: name"})
        return;
    }
    
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    // Check if user already exists
    const existing_users = await knex(table_names.user)
        .where("email", email);


    if (existing_users.length > 0) {
        res.send({
            "code": 409,
            "message": "User account with same email already exists"
        })
        return;
    }

    const user = {
        "email": req.body.email,
        "name": req.body.name,
        "password": encryptedPassword
    };

    knex(table_names.user).insert(user)
        .then(function(result) {
            res.send({
                "code": 200,
                "user": user
            })
        });

}

exports.login = async function(req, res) {

}
