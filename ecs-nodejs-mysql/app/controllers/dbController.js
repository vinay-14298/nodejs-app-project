const db = require('../../config/database');

exports.getHelloWorld = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT "Hello, World!" AS message');
        res.json(rows);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send('Internal Server Error');
    }
};

