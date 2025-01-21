const mysql = require('mysql2/promise');
const { getSecrets } = require('../app/utils/secrets');

const initDb = async () => {
    try {
        console.log('Retrieving database credentials from AWS Secrets Manager...');
        const secrets = await getSecrets('mysql-db-credentials');
        console.log('Retrieved secrets:', secrets);

        // Create MySQL connection pool
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
    } catch (error) {
        console.error('Database connection failed:', error.message);
        throw error;
    }
};

module.exports = initDb;

