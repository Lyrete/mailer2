require('dotenv').config();

var mysql = require('mysql2/promise');
var connection = mysql.createConnection({
    host: process.env.MAILER_DBHOST,
    user: process.env.MAILER_DBUSER,
    password: process.env.MAILER_DBPW,
    database: process.env.MAILER_DBNAME
});
var Password = require('node-php-password');

const pool = mysql.createPool({
    host: process.env.MAILER_DBHOST,
    user: process.env.MAILER_DBUSER,
    password: process.env.MAILER_DBPW,
    database: process.env.MAILER_DBNAME,
    connectionLimit: 5,
    queueLimit: 0
});

async function authUser(user, password){
    var sql = 'SELECT * FROM ?? WHERE ?? = ?';
    var query = ['users', 'user', user];
    sql = mysql.format(sql,query);
    const [rows, fields] = await pool.execute(sql);
    const data = rows[0];
    if(data){
        if(Password.verify(password, data.pw)){
            return true;   
        }
    }
    
    return false;
    
}

module.exports = authUser;