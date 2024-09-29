import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const AddNewEpaper = () => {
    return (
        <button className="bg-blue-200 hover:bg-blue-300 text-black rounded-lg p-4 shadow-lg flex flex-col items-center border-2 border-blue-300">
            <FontAwesomeIcon icon={faPlusCircle} className="text-3xl text-black" />
            <span className="text-black font-bold">New ePaper</span>
        </button>
    );
};

export default AddNewEpaper;
