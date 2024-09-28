import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EpaperList from '../EpaperCard/EpaperList';
import AddNewEpaper from '../AddNewEpaper/AddNewEpaper';
import NewEpaperModal from '../AddNewEpaper/NewEpaperModal';

const Home = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();  // Initialize the navigation hook

    // Function to open the modal
    const handleNewEpaperClick = () => {
        setModalOpen(true);
    };

    // Function to handle saving new ePaper
    const handleSaveNewEpaper = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/api/eNewsPage/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    newstitle: data.newstitle,
                    pagecontent: null, // Initially null
                    created_at: new Date().toISOString(), // Current timestamp
                    updated_at: null // Initially null
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save the new ePaper');
            }

            const result = await response.json();
            console.log('New ePaper saved with ID:', result.newsid);

            // Navigate to the NewspaperEditor (CanvasContainer) with newsid and pageid
            navigate(`/newspapereditor?newsid=${result.newsid}&pageid=1`);
        } catch (error) {
            console.error('Error saving new ePaper:', error);
        }
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold">My Epapers</h1>
                <button onClick={handleNewEpaperClick}>
                    <AddNewEpaper />
                </button>
            </div>

            {/* Render the modal for creating a new ePaper */}
            <NewEpaperModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveNewEpaper}
            />

            <EpaperList />
        </div>
    );
};

export default Home;
