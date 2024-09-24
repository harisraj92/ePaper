import React, { useState } from "react";
import { FaLayerGroup, FaCog } from "react-icons/fa";
import LayerDetails from "./LayerList";
import Properties from "./Properties";

const RightSidebar = () => {
    const [activeTab, setActiveTab] = useState(0); // Tab state: 0 = Layers, 1 = Properties

    return (
        <div className="absolute right-5 top-16 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg border-l flex flex-col rounded-xl">
            {/* Tabs with icons */}
            <div className="flex mb-4">
                <button
                    className={`p-2 w-1/2 flex justify-center items-center transition duration-200 ease-in-out 
                    ${activeTab === 0 ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg"}`}
                    onClick={() => setActiveTab(0)}
                >
                    <FaLayerGroup className="mr-2" /> Layers
                </button>
                <button
                    className={`p-2 w-1/2 flex justify-center items-center transition duration-200 ease-in-out 
                    ${activeTab === 1 ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg"}`}
                    onClick={() => setActiveTab(1)}
                >
                    <FaCog className="mr-2" /> Properties
                </button>
            </div>

            {/* Tab Content */}
            <div className="flex-grow overflow-y-auto p-4 bg-gray-50 border-t">
                {activeTab === 0 ? <LayerDetails /> : <Properties />}
            </div>
        </div>
    );
};

export default RightSidebar;
