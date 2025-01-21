const mysql = require('mysql2/promise');
const { getSecrets } = require('../app/utils/secrets');

const initDb = async () => {
    const secrets = await getSecrets('mysql-db-credentials');
    const connection = await mysql.createPool({
        host: secrets.host,
        user: secrets.username,
        password: secrets.password,
        database: secrets.database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });

    console.log('MySQL pool created');
    return connection;
};

module.exports = initDb();

