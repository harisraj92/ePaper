const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



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


// Define the storage location and filename for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'src', 'assets', 'images');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true }); // Create folder if it doesn't exist
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

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

    // Step 1: Get the maximum newsid in the database
    const getMaxNewsIdQuery = 'SELECT MAX(newsid) as maxNewsId FROM eNewsPage';

    queryDB(getMaxNewsIdQuery, [], (err, result) => {
        if (err) {
            console.error('Error fetching max newsid:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        let newsid = 1;  // Default to 1 if no records exist
        if (result && result[0] && result[0].maxNewsId !== null) {
            newsid = result[0].maxNewsId + 1;  // Increment newsid if it exists
        }

        // Step 2: Check if pages exist for this newsid and determine the next pageid
        const getMaxPageIdQuery = 'SELECT MAX(pageid) as maxPageId FROM eNewsPage WHERE newsid = ?';

        queryDB(getMaxPageIdQuery, [newsid], (err, result) => {
            if (err) {
                console.error('Error fetching max pageid:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            let pageid = 1;  // Default to 1 if no pages exist
            if (result && result[0] && result[0].maxPageId !== null) {
                pageid = result[0].maxPageId + 1;  // Increment pageid if it exists
            }

            // Step 3: Insert the new record with the calculated newsid and pageid
            const insertQuery = 'INSERT INTO eNewsPage (newsid, pageid, pagecontent, newstitle) VALUES (?, ?, ?, ?)';

            const values = [newsid, pageid, pagecontent || null, newstitle || 'Untitled ePage'];

            queryDB(insertQuery, values, (err, result) => {
                if (err) {
                    console.error('Error saving page data:', err);
                    return res.status(500).json({ error: 'Database error' });
                }

                res.status(200).json({ message: 'Page saved successfully', newsid, pageid });
            });
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
    const query = `SELECT newstitle, updated_at,1 as pages, pageid, newsid FROM eNewsPage`;

    queryDB(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Failed to fetch data from the database' });
        }

        //console.log("Results from the database:", results);

        // Ensure you are returning valid JSON
        if (!results || results.length === 0) {
            return res.status(404).json({ error: 'No data found' });
        }

        // Send the result as a JSON response
        res.status(200).json(results);  // Make sure you send results as valid JSON
    });
});




//-----------------------------------------Upload image ----------------------
app.post('/api/uploadImage', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Create the path for the uploaded image
        const imagePath = `/assets/images/${req.file.filename}`;



        // Send back the image URL in JSON format
        res.status(200).json({ imagePath });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

// Serve the uploaded images as static files
app.use('/assets/images', express.static(path.join(__dirname, 'src', 'assets', 'images')));
//---------------------------------------------

// API endpoint to get the newstitle based on newsid
app.get('/api/eNewspage/:newsid', (req, res) => {
    const { newsid } = req.params;
    const query = 'SELECT newstitle FROM eNewsPage WHERE newsid = ?';

    queryDB(query, [newsid], (err, results) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        if (results.length > 0) {
            res.json(results[0]); // Return the first result
        } else {
            res.status(404).send('No title found');
        }
    });
});

app.put('/api/eNewspage/update/:newsid', (req, res) => {
    const { newsid } = req.params;
    const { newstitle } = req.body;

    if (!newstitle) {
        return res.status(400).json({ error: 'New title is required' });
    }

    const query = 'UPDATE eNewsPage SET newstitle = ? WHERE newsid = ?';

    queryDB(query, [newstitle, newsid], (err, result) => {
        if (err) {
            console.error('Error updating title:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(200).json({ message: 'Title updated successfully' });
    });
});



// API endpoint to get the newstitle based on newsid
app.delete('/api/eNewspage/:newsid', (req, res) => {
    const { newsid } = req.params;
    console.log(`Received DELETE request for newsid: ${newsid}`);  // Add this line
    const query = 'DELETE FROM eNewsPage WHERE newsid = ?';
    queryDB(query, [newsid], (err, results) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        res.status(200).json({ message: 'Successfully deleted', newsid });
    });
});

















// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

