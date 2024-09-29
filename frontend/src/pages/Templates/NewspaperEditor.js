import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CanvasContainer from './CanvasContainer';

// Custom hook to extract query parameters from the URL
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const NewspaperEditor = () => {
    const { newsid: paramNewsid, pageid: paramPageid } = useParams();
    const [newstitle, setNewstitle] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);

    const query = useQuery();

    // Check if there are query parameters; otherwise, use route parameters
    const newsid = paramNewsid || query.get('newsid');
    const pageid = paramPageid || query.get('pageid');
    const isEditMode = !!newsid && !!pageid; // Check if editing or adding new

    // Debugging log to check if the values are correct
    console.log('News ID:', newsid);
    console.log('Page ID:', pageid);

    useEffect(() => {
        const fetchNewstitle = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/eNewspage/${newsid}`);
                const data = await response.json();

                if (data && data.newstitle) {
                    setNewstitle(data.newstitle);
                } else {
                    setNewstitle('Untitled Page');
                }
            } catch (error) {
                console.error('Error fetching newstitle:', error);
                setError('Error fetching title');
            }
        };

        fetchNewstitle();
    }, [newsid]);

    // Function to handle the saving of the updated title
    const handleSaveTitle = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/eNewspage/update/${newsid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newstitle }),
            });

            if (!response.ok) {
                throw new Error('Failed to update title');
            }

            const result = await response.json();
            console.log(result.message);
        } catch (error) {
            console.error('Error updating title:', error);
            setError('Error updating title');
        } finally {
            setIsEditing(false); // Exit editing mode
        }
    };

    // Event handler when clicking on the title
    const handleTitleClick = () => {
        setIsEditing(true); // Enable editing mode
    };

    // Event handler for when editing finishes (on blur or pressing Enter)
    const handleBlurOrSubmit = () => {
        handleSaveTitle(); // Save the title
    };

    // Event handler for detecting Enter key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSaveTitle();
        }
    };

    return (
        <div>
            {/* Title editing logic */}
            {isEditing ? (
                <input
                    type="text"
                    value={newstitle}
                    onChange={(e) => setNewstitle(e.target.value)}
                    onBlur={handleBlurOrSubmit}  // Save when clicking outside
                    onKeyDown={handleKeyDown}    // Save on Enter key
                    autoFocus
                    className="border p-2 rounded"
                />
            ) : (
                <h1 onClick={handleTitleClick} className="cursor-pointer text-4xl font-bold">
                    {newstitle}
                </h1>
            )}

            {error && <p className="text-red-500">{error}</p>}

            {/* Pass the extracted newsid, pageid, and edit mode flag as props to CanvasContainer */}
            <CanvasContainer newsid={newsid} pageid={pageid} isEditMode={isEditMode} />
        </div>
    );
};

export default NewspaperEditor;
