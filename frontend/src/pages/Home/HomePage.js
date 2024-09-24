import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import EpaperCard from './EpaperCard';  // Import the EpaperCard component
import NewEpaperButton from './NewEpaperButton';

const Home = () => {
    const navigate = useNavigate();  // Initialize the navigation hook

    const handleNewEpaperClick = () => {
        navigate('/NewspaperEditor');  // Navigate to DesignArea when clicked
    };

    const handleEdit = () => {
        alert('Edit button clicked!');
    };

    const handleDelete = () => {
        alert('Delete button clicked!');
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold">My Epapers</h1>
                {/* Trigger New ePaper layout when clicked */}
                <button onClick={handleNewEpaperClick}>
                    <NewEpaperButton />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* Example ePaper card */}
                <EpaperCard
                    title="Epaper"
                    createdDate="2024-09-15"
                    pages={1}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default Home;
