const express = require('express');
const mysql = require('mysql2/promise');
const AWS = require('aws-sdk');

const app = express();
const port = 3000;

// Load secrets from AWS Secrets Manager
const getSecrets = async () => {
    const client = new AWS.SecretsManager({ region: 'us-east-1' });
    const secretName = 'mysql-db-credentials';

    try {
        const data = await client.getSecretValue({ SecretId: secretName }).promise();
        return JSON.parse(data.SecretString);
    } catch (err) {
        console.error('Error fetching secrets:', err);
        throw err;
    }
};

const connectToDatabase = async () => {
    const secrets = await getSecrets();

    const connection = await mysql.createConnection({
        host: secrets.host,
        user: secrets.username,
        password: secrets.password,
        database: secrets.database,
    });

    console.log('Connected to MySQL');
    return connection;
};

app.get('/', async (req, res) => {
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.query('SELECT "Hello, World!" as message');
        res.json(rows);
        connection.end();
    } catch (err) {
        console.error('Error handling request:', err);
        res.status(500).send('Error connecting to database');
    }
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});

