import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const EpaperCard = ({ newstitle, updated_at, newsid, pageid, pages, onDelete }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        console.log("Navigating to editor with:", { newsid, pageid });
        //navigate(`/newspapereditor/${newsid}/${pageid}`);
        navigate(`/newspapereditor?newsid=${newsid}&pageid=${pageid}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (!isNaN(date)) {
            return date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        }
        return 'Unknown Date';
    };

    const handleDelete = async () => {
        console.log(`Attempting to delete newsid: ${newsid}`); // Log the newsid to verify

        try {
            const response = await fetch(`http://localhost:5000/api/eNewspage/${newsid}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const result = await response.json();
                console.log('Delete successful:', result);  // Log success
                onDelete(newsid);
            } else {
                const errorData = await response.json();
                console.log('Delete failed:', errorData);  // Log the error response
                alert(errorData.message || 'Failed to delete the eNewspage.');
            }
        } catch (error) {
            console.error('Error deleting eNewspage:', error);
            alert('Error deleting eNewspage. Please try again.');
        }

    };


    return (
        <div className='flex flex-row flex-wrap space-x-4 p-2'>
            <div className="bg-yellow-400 p-4 rounded-lg shadow-md flex items-center space-x-2">
                <div>
                    <h2 className="text-2xl font-bold text-white">{newstitle || 'Untitled Page'}</h2>
                    <p className="text-sm text-white">updated on {formatDate(updated_at)}</p>
                    <div className="mt-4 flex space-x-2">
                        <button
                            onClick={handleEdit}  // Trigger navigation with newsid and pageid
                            className="mr-2 bg-white text-black border border-black rounded-lg px-3 py-1 flex items-center space-x-2 hover:bg-gray-200"
                        >
                            <FontAwesomeIcon icon={faEdit} className="text-lg" />
                            <span>Edit</span>
                        </button>
                        <button onClick={handleDelete} className="bg-red-500 text-white rounded-lg px-3 py-1 
                        flex items-center space-x-2 hover:bg-red-700">
                            <FontAwesomeIcon icon={faTrashAlt} className="text-lg" />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <FontAwesomeIcon icon={faNewspaper} className="text-6xl text-white" />
                    <p className="mt-2 text-white">Pages {pages}</p>
                </div>
            </div>
        </div>
    );
};

export default EpaperCard;