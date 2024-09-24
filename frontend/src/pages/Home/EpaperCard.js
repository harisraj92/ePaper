import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faNewspaper } from "@fortawesome/free-solid-svg-icons"; // Add necessary icons

const EpaperCard = ({ title, createdDate, pages, onEdit, onDelete }) => {
    return (
        <div>
            <div className='flex space-x-4'>
                <div className="bg-yellow-400 p-4 rounded-lg shadow-md flex  items-center space-x-2">
                    {/* Left Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-white">{title}</h2>
                        <p className="text-sm text-white">Created on {createdDate}</p>
                        <div className="mt-4 flex space-x-2">
                            <button
                                onClick={onEdit}
                                className="mr-2 bg-white text-black border border-black rounded-lg px-3 py-1 flex items-center space-x-2 hover:bg-gray-200"
                            >
                                <FontAwesomeIcon icon={faEdit} className="text-lg" />
                                <span>Edit {title}</span>
                            </button>
                            <button
                                onClick={onDelete}
                                className="bg-red-500 text-white rounded-lg px-3 py-1 flex items-center space-x-2 hover:bg-red-700"
                            >
                                <FontAwesomeIcon icon={faTrashAlt} className="text-lg" />

                            </button>
                        </div>
                    </div>
                    {/* Right Section (Image and Pages) */}
                    <div className="flex flex-col items-center">
                        <FontAwesomeIcon icon={faNewspaper} className="text-6xl text-white" />
                        <p className="mt-2 text-white">Pages {pages}</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="bg-green-400 p-4 rounded-lg shadow-md flex  items-center space-x-2  ">
                        {/* Left Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-white">{title}</h2>
                            <p className="text-sm text-white">Created on {createdDate}</p>
                            <div className="mt-4 flex space-x-2">
                                <button
                                    onClick={onEdit}
                                    className="mr-2 bg-white text-black border border-black rounded-lg px-3 py-1 flex items-center space-x-2 hover:bg-gray-200"
                                >
                                    <FontAwesomeIcon icon={faEdit} className="text-lg" />
                                    <span>Edit {title}</span>
                                </button>
                                <button
                                    onClick={onDelete}
                                    className="bg-red-500 text-white rounded-lg px-3 py-1 flex items-center space-x-2 hover:bg-red-700"
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} className="text-lg" />

                                </button>
                            </div>
                        </div>
                        {/* Right Section (Image and Pages) */}
                        <div className="flex flex-col items-center">
                            <FontAwesomeIcon icon={faNewspaper} className="text-6xl text-white" />
                            <p className="mt-2 text-white">Pages {pages}</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>

        //-----------------------------




    );
};

export default EpaperCard;
