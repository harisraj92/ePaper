const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'root', // Your MySQL password
    database: 'ePaper', // Database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Helper function to query the database
const queryDB = (query, values, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return callback(err, null);
        }
        connection.query(query, values, (err, result) => {
            connection.release(); // Release the connection back to the pool
            if (err) {
                console.error('Query error:', err);
                return callback(err, null);
            }
            callback(null, result);
        });
    });
};

// API to save canvas data
app.post('/api/editor', (req, res) => {
    const { id, content, width, height } = req.body;

    if (!id || !content || !width || !height) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const query = 'INSERT INTO editor (id, content, width, height) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE content = ?, width = ?, height = ?';
    const values = [id, content, width, height, content, width, height];

    queryDB(query, values, (err, result) => {
        if (err) {
            console.error('Error saving canvas:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Canvas saved', id });
    });
});


// Fetch the latest canvas including width and height
app.get('/api/editor/last', async (req, res) => {
    try {
        const query = 'SELECT content, width, height FROM editor ORDER BY id DESC LIMIT 1';
        queryDB(query, [], (err, result) => {
            if (err || result.length === 0) {
                return res.status(500).json({ error: 'Error fetching canvas data' });
            }
            const { content, width, height } = result[0];
            res.json({ content, width, height });
        });
    } catch (error) {
        console.error('Error fetching canvas data:', error);
        res.status(500).send('Error fetching canvas data');
    }
});


// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
