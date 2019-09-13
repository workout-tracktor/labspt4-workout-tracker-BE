//IMPORTS
const crypt = require('bcryptjs')
const uuid = require('uuid')
//local
const jwtGenToken = require('../helpers/jwt_token_gen')
const check = require('../helpers/check')
const retrieve = require('../helpers/retreive')
const misc = require('../helpers/misc')

//VARIABLES
const db_name = 'users'


// MAYBE HERE

function login(email, password, callback) {
    //this example uses the "pg" library
    //more info here: https://github.com/brianc/node-postgres
    
    const bcrypt = require('bcrypt');
    const postgres = require('pg');
    
    const conString = 'postgres://postgres:password@localhost/liftquest';
    postgres(conString, function (err, client, done) {
    if (err) return callback(err);
    
    const query = 'SELECT id, username, email, password FROM users WHERE email = $1';
    client.query(query, [email], function (err, result) {
      // NOTE: always call `done()` here to close
      // the connection to the database
      done();
    
      if (err || result.rows.length === 0) return callback(err || new WrongUsernameOrPasswordError(email));
    
      const user = result.rows[0];
    
      bcrypt.compare(password, user.password, function (err, isValid) {
        if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));
    
        return callback(null, {
          user_id: user.id,
          username: user.username,
          email: user.email
        });
      });
    });
    });
    }

    function create(user, callback) {
        //this example uses the "pg" library
        //more info here: https://github.com/brianc/node-postgres
        
        const bcrypt = require('bcrypt');
        const postgres = require('pg');
        
        const conString = 'postgres://user:pass@localhost/mydb';
        postgres(conString, function (err, client, done) {
        if (err) return callback(err);
        
        bcrypt.hash(user.password, 10, function (err, hashedPassword) {
          if (err) return callback(err);
        
          const query = 'INSERT INTO users(email, password) VALUES ($1, $2)';
          client.query(query, [user.email, hashedPassword], function (err, result) {
            // NOTE: always call `done()` here to close
            // the connection to the database
            done();
        
            return callback(err);
          });
        });
        });
        }




//LOGIN
//:
authenticate = async (req, res, next) => {
    const required_fields = ['username', 'password']

    //check if all required keys are provided
    if(!check.required(req.body, ...required_fields))
        return res.status(500).json({error: `The required fields are: ${required_fields}.`})

    //rebuild reqbody, removing any possible extra fields
    req.body = {
        username: req.body.username,
        password: req.body.password
    }

    next()
}
//:
username_exists = async (req, res, next) => {
    const user = await retrieve.get_by(db_name, {username: req.body.username})
    if(!user)
        return res.status(404).json({error: `Username ${req.body.username} couldn't be found.`})

    next()
}
//:
password_matches = async (req, res, next) => {
    const user = await retrieve.get_by(db_name, {username: req.body.username})
    if(user) {
        if(crypt.compareSync(req.body.password, user.password))
            req.authorization = jwtGenToken(user)
        else
            return res.status(403).json({error: `Try the right password next time dumbass.`})
    }

    next()
}
//REGISTER
//:
register = async (req, res, next) => {
    //check if all required fields are provided
    const required_fields = await retrieve.required_list(db_name)
    required_fields.remove('id', 'uid', 'start_date')
    if(!check.required(req.body, ...required_fields))
        return res.status(500).json({error: `The required fields are: ${required_fields}.`})
    
    //check unqiue fields
    const unique_fields = ['username', 'email']
    let message = ''
    let flag = false
    let fields = []
    await Promise.all(unique_fields.map(async (field) => {
        if(await retrieve.get_by(db_name, {[field]: req.body[field]})) {
            message = `${field} ${req.body[field]} is currently in use.`
            fields.push(field)
            flag = true
        }
    }))
    if(flag) return res.status(612).json({error: message, invalid_fields: fields})

    //calculates id of new user
    const id = await retrieve.new_id(db_name)

    //get timestamp
    const now = new Date()

    //rebuild reqbody, removing any possible extra fields
    req.body = {
        id: id,
        uid: uuid.v4(),
        username: req.body.username,
        email: req.body.email,
        password: crypt.hashSync(req.body.password, 1),
        start_date: now,
    }

    next()
}

//EXPORTS
module.exports = {
    register,
    authenticate,
    username_exists,
    password_matches,
}