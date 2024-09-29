import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EpaperList from '../EpaperCard/EpaperList';

const Home = () => {
    const [newsid, setNewsid] = useState('');
    const [pageid] = useState(1); // Default to 1 since it's the first page
    const [createdAt] = useState(new Date().toISOString()); // Set current timestamp
    const navigate = useNavigate();  // Initialize the navigation hook

    // Function to handle saving new ePaper
    const handleSaveNewEpaper = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/api/eNewsPage/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    newstitle: data.newstitle || "Untitled ePage",  // Default title if not provided
                    pagecontent: null, // Page content can be added later
                    created_at: new Date().toISOString(), // Current timestamp
                    updated_at: null // Initially null
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save the new ePaper');
            }

            const result = await response.json();
            console.log('New ePaper saved with ID:', result.newsid);

            // Navigate to the NewspaperEditor (CanvasContainer) with the newly created newsid and pageid as 1
            navigate(`/newspapereditor?newsid=${result.newsid}&pageid=1`);
        } catch (error) {
            console.error('Error saving new ePaper:', error);
        }
    };


    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold">My Epapers</h1>
                <div>
                    <button
                        onClick={handleSaveNewEpaper}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Create ePaper
                    </button>
                </div>
            </div>

            <EpaperList />
        </div>
    );
};

export default Home;
