const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Meomeo1234@',
    database: 'taskmanagement',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
pool.getConnection((err, connection) => {
    if (err) {
        console.error('MySQL connection failed:', err.message);
    } else {
        console.log('MySQL connected successfully!');
        connection.release(); 
    }
});

module.exports = pool; 
