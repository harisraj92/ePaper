import React, { useState } from 'react';

const NewEpaperModal = ({ isOpen, onClose, onSave }) => {
    const [newstitle, setNewstitle] = useState('');

    const handleSave = () => {
        if (!newstitle) {
            alert('Please enter a newspaper title');
            return;
        }

        const data = {
            newstitle
        };
        onSave(data);
        onClose();  // Close the modal after saving
    };

    if (!isOpen) return null; // If modal is not open, return nothing

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Create New ePaper</h2>

                {/* Newspaper Title Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Newspaper Title</label>
                    <input
                        type="text"
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                        value={newstitle}
                        onChange={(e) => setNewstitle(e.target.value)}
                        placeholder="Enter Newspaper Title"
                    />
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewEpaperModal;