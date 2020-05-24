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
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    
    // check params
    if (!first_name) return res.status(400).send({message: "Missing required parameter: first_name"});
    if (!last_name) return res.status(400).send({message: "Missing required parameter: last_name"});
    if (!password) return res.status(400).send({message: "Missing required parameter: password"});
    if (!email) return res.status(400).send({message: "Missing required parameter: email"});

    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    // Check if user already exists
    const existing_users = await knex(table_names.user)
        .where("email", email);
    if (existing_users.length > 0) return res.state(409).send({message: "User account with same email already exists."})

    // Create User Object
    const user = {
        "email": req.body.email,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "password": encryptedPassword
    };
    
    user.id = await knex(table_names.user).insert(user);

    // Create User verified token
    const userVerifiedToken = {
        "user_id": user.id,
        "code": Math.random().toString(36).substring(7)
    }

    await knex(table_names.userVerifiedCode).insert(userVerifiedToken)

    // TODO  Add code to send email
    return res.status(200).send({user: user})
}

exports.login = async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    // Check missing parameters
    if (!email) return res.status(400).send({message: "Missing required parameter: email"});
    if (!password) return res.status(400).send({message: "Missing required parameter: password"});

    // Check existing user
    const user = await knex(table_names.user).where('email', email);
    if (user.length <= 0) return res.status(206).send({message: "No user found with email provided"});
    if (!user[0].email_verified) return res.status(401).send({message: "User not verified"});

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

exports.verifyUser = async function (req, res) {
    const email = req.body.email;
    const code = req.body.code;
    
    // check missing parameters
    if (!email) return res.status(400).send({message: "Missing required parameter: email"});
    if (!code) return res.status(400).send({message: "Missing required parameter: code"});

    // Get the user
    const user = await knex.table(table_names.user).where("email", email).whereNull("deleted_at");
    if (user.length != 1) return res.status(206).send({message: "No user found with email provided"});

    // Get the latest code 
    const userVerifiedCode = await knex.table(table_names.userVerifiedCode).where("user_id", user[0].id)
        .whereNull("verified_at")
        .whereNull("deleted_at")
        .orderBy("created_at", "desc")
        .first();
        
    // TODO check if code is older than 24 hours
    if (code != userVerifiedCode.code) return res.status(401).send({message: "Invalid code"});

    // Verify user
    await knex.table(table_names.user)
        .where("id", user[0].id)
        .update({
            "email_verified": true
        })

    // update verfied timestamp on code
    await knex.table(table_names.userVerifiedCode)
        .where("id", userVerifiedCode.id)
        .update({
            "verified_at": knex.fn.now()
        })

    return res.status(200);
}
