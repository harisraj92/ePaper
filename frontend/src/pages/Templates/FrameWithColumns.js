import React, { useState } from 'react';

const FrameWithColumns = () => {
    // State for frame width, height, and number of columns
    const [frameSize, setFrameSize] = useState({ width: 800, height: 600 });
    const [columns, setColumns] = useState(2); // Default number of columns

    // Handle input change for frame width and height
    const handleSizeChange = (e) => {
        const { name, value } = e.target;
        setFrameSize({ ...frameSize, [name]: Number(value) });
    };

    // Handle change in number of columns
    const handleColumnChange = (e) => {
        setColumns(Number(e.target.value));
    };

    return (
        <div>
            {/* Controls for setting width, height, and number of columns */}
            <div className="p-4">
                <label>Width (px): </label>
                <input
                    type="number"
                    name="width"
                    value={frameSize.width}
                    onChange={handleSizeChange}
                    className="bg-white p-2 border rounded-md"
                />
                <label className="ml-4">Height (px): </label>
                <input
                    type="number"
                    name="height"
                    value={frameSize.height}
                    onChange={handleSizeChange}
                    className="bg-white p-2 border rounded-md"
                />
                <label className="ml-4">Columns: </label>
                <input
                    type="number"
                    name="columns"
                    value={columns}
                    onChange={handleColumnChange}
                    className="bg-white p-2 border rounded-md"
                />
            </div>

            {/* Frame container */}
            <div
                className="frame-container"
                style={{
                    width: `${frameSize.width}px`,
                    height: `${frameSize.height}px`,
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: '10px',
                    border: '2px solid black',
                    padding: '10px',
                    backgroundColor: '#f0f0f0',
                }}
            >
                {/* Columns inside the frame */}
                {[...Array(columns)].map((_, index) => (
                    <div key={index} className="frame-column" style={{ border: '1px solid gray', padding: '10px' }}>
                        <p>Column {index + 1}</p>
                        <p>Content goes here...</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FrameWithColumns;
