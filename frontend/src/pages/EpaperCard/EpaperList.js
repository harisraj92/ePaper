import React, { useState, useEffect } from 'react';
import EpaperCard from './EpaperCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EpaperList = () => {
    const [epaperList, setEpaperList] = useState([]); // Initialize as an empty array
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const cardsPerPage = 9; // Display 9 cards per page

    useEffect(() => {
        // Fetch epaper data
        const fetchEpapers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/eNewsPage');
                const data = await response.json();

                if (Array.isArray(data)) {
                    setEpaperList(data); // Set data into state if it's an array
                } else {
                    setEpaperList([]); // Set an empty array if data is not an array
                }

                console.log('Fetched epaper data:', data);  // Log the API response
            } catch (error) {
                console.error('Error fetching epapers:', error);
                setEpaperList([]); // Set an empty array in case of an error
            }
        };

        fetchEpapers();
    }, []);

    // Calculate indices for the current page's cards
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentEpapers = epaperList.slice(indexOfFirstCard, indexOfLastCard);

    const totalPages = Math.ceil(epaperList.length / cardsPerPage); // Calculate total pages

    // Handle pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Function to handle removing a deleted epaper from the list
    const handleDelete = (deletedNewsid) => {
        try {
            // Remove the deleted ePaper from the state
            const updatedList = epaperList.filter(epaper => epaper.newsid !== deletedNewsid);
            setEpaperList(updatedList);

            // Show success toast
            toast.success('ePaper deleted successfully!');
        } catch (error) {
            // Show error toast
            toast.error('Failed to delete ePaper!');
        }
    };

    return (
        <div className="container mx-auto">
            {/* Toast Container for displaying toast messages */}
            <ToastContainer />

            {/* Scrollable grid layout for epapers */}
            <div className="grid grid-cols-3 gap-4 p-4 max-h-96 overflow-y-auto">
                {currentEpapers.length === 0 ? (
                    <p>No epapers found.</p>  // Fallback if no data
                ) : (
                    currentEpapers.map((epaper, index) => (
                        <EpaperCard
                            key={index}
                            newstitle={epaper.newstitle || 'Untitled ePage'}  // Pass the correct key for title
                            updated_at={epaper.updated_at}  // Pass the correct key for updated_at
                            newsid={epaper.newsid}
                            pageid={epaper.pageid}
                            pages={epaper.pages}
                            onDelete={handleDelete}  // Pass the delete callback
                        />
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                                }`}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EpaperList;
