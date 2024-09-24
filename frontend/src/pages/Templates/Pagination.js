import React, { useState } from 'react';

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 1; // Example of 10 total pages

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    return (
        <div className="container mx-auto p-4 flex flex-col items-center justify-center">
            {/* Page Name */}
            <h1 className="text-xs font-bold text-center mb-4">Page {currentPage}</h1>

            {/* Pagination */}
            <nav aria-label="Page navigation" className="flex items-center">
                <button
                    onClick={handlePrev}
                    className={`${currentPage === 1
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-700 text-xs'
                        } px-3 py-2 rounded-l-md text-xs`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <ul className="flex items-center text-xs">
                    {Array.from({ length: totalPages }).map((_, idx) => (
                        <li key={idx}>
                            <button
                                onClick={() => setCurrentPage(idx + 1)}
                                className={`px-3 py-2 border text-xs ${currentPage === idx + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-blue-500 hover:bg-gray-200 text-xs'
                                    }`}
                            >
                                {idx + 1}
                            </button>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={handleNext}
                    className={`${currentPage === totalPages
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-grey-500 text-white hover:bg-blue-700 text-xs'
                        } px-3 py-2 rounded-r-md text-xs`}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </nav>
        </div>
    );
};

export default Pagination;
