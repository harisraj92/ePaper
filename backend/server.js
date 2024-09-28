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
    database: 'epaper', // Database name
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

app.post('/api/eNewsPage', (req, res) => {
    const { newsid, pageid, pagecontent } = req.body;

    // Log the request body to ensure it's correct
    //console.log('Received request body:', req.body);

    // Validate input
    if (!newsid || !pageid || !pagecontent) {
        console.error('Missing parameters:', { newsid, pageid, pagecontent });
        return res.status(400).json({ error: 'Invalid input: Missing newsid, pageid, or pagecontent' });
    }

    const query = `
        INSERT INTO eNewsPage (newsid, pageid, pagecontent)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE pagecontent = ?, updated_at = CURRENT_TIMESTAMP
    `;

    // The values that will be inserted or updated in the database
    const values = [
        newsid,
        pageid,
        JSON.stringify(pagecontent),  // Insert content
        JSON.stringify(pagecontent)   // Update content on duplicate
    ];

    // Log the query values to debug
    // console.log('Query values:', values);

    // Execute the query
    queryDB(query, values, (err, result) => {
        if (err) {
            console.error('Error saving page data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Page saved successfully', newsid, pageid });
    });
});
//--------------------------------------------Add new ePaper--------------------------------------------------------------------------

app.post('/api/eNewsPage/new', (req, res) => {
    const { newstitle, pagecontent } = req.body;

    // Generate random newsid
    const randomNewsId = Math.floor(1000 + Math.random() * 9000); // Generates a random number between 1000 and 9999

    // Check if pages exist for the generated newsid
    const getMaxPageIdQuery = `SELECT MAX(pageid) as maxPageId FROM eNewsPage WHERE newsid = ?`;

    queryDB(getMaxPageIdQuery, [randomNewsId], (err, result) => {
        if (err) {
            console.error('Error fetching max pageid:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Determine the next pageid
        let pageid = 1;  // Default to 1 if no pages exist
        if (result && result[0] && result[0].maxPageId !== null) {
            pageid = result[0].maxPageId + 1;  // Increment pageid if it exists
        }

        // Now insert the new record with the generated newsid and calculated pageid
        const insertQuery = `INSERT INTO eNewsPage (newsid, pageid, pagecontent, newstitle) VALUES (?, ?, ?, ?)`;

        const values = [randomNewsId, pageid, pagecontent || null, newstitle || null];

        queryDB(insertQuery, values, (err, result) => {
            if (err) {
                console.error('Error saving page data:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            res.status(200).json({ message: 'Page saved successfully', newsid: randomNewsId, pageid });
        });
    });
});





///----------------------------------------------------------------------------------------------------------------------











app.get('/api/eNewsPage/editnews', (req, res) => {
    const { newsid, pageid } = req.query;

    if (!newsid || !pageid) {
        return res.status(400).json({ error: 'Missing newsid or pageid' });
    }

    // Only selecting the pagecontent, as width and height are not columns in your table
    const query = 'SELECT pagecontent FROM eNewsPage WHERE newsid = ? AND pageid = ?';
    queryDB(query, [newsid, pageid], (err, results) => {
        if (err) {
            console.error('Error fetching canvas data:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Canvas data not found' });
        }

        const { pagecontent } = results[0];
        res.status(200).json({ pagecontent });
    });
});




app.get('/api/eNewsPage', (req, res) => {
    // Query to fetch newstitle and updated_at based on fixed newsid and pageid
    const query = `SELECT newstitle, updated_at,1 as pages, pageid, newsid 
    FROM eNewsPage`;

    queryDB(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            res.status(500).json({ error: 'Failed to fetch data from the database' });
            return;
        }

        // Send the result as a JSON response
        res.json(results);
    });
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

app.timeout = 600000; 