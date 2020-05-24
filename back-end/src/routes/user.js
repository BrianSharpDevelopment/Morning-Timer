const bcrypt = require('bcrypt');
const table_names = require('./../constants/table_names');
const jwt = require('jsonwebtoken');
const config = require('./../config');
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
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;

    if (!password) return res.status(400).send({message: "Missing required parameter: password"});

    if (!email) return res.status(400).send({message: "Missing required parameter: email"});

    if (!first_name) return res.status(400).send({message: "Missing required parameter: first_name"});

    if (!last_name) return res.status(400).send({message: "Missing required parameter: last_name"});

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
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
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
    const email = req.body.email;
    const password = req.body.password;
    

    if (!email) {
        res.send({code: 400, message: "Missing required parameter: email"});
        return;
    }

    if (!password) {
        res.send({code: 400, message: "Missing required parameter: password"});
        return;
    }

    const user = await knex(table_names.user).where('email', email);

    if (user.length <= 0) {
        res.send({code: 206, message: "No user found with email provided."});
        return;
    }

    const compare_password = await bcrypt.compare(password, user[0].password);

    if(compare_password) {
        // success - create jwt token and return
        var token = jwt.sign({ id: user[0].id }, config.JWT_SECRET, {
            expiresIn: 86400 // expires in 24 hours
          });

        await knex(table_names.user).update({'last_login': knex.fn.now()})
        res.send({code: 200, message: "Successful login", token: token});
        return;
    } else {
        res.send({code: 204, message: "Failed login"});
        return;
    }
}
