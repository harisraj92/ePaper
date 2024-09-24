import React, { useState } from "react";

const Properties = ({ onUpdateCanvas }) => {
    const [width, setWidth] = useState("1024px");
    const [height, setHeight] = useState("768px");
    const [columns, setColumns] = useState("7");

    // Handle width, height, and column changes
    const handleWidthChange = (e) => {
        setWidth(e.target.value);
        onUpdateCanvas({ width: e.target.value, height });
    };

    const handleHeightChange = (e) => {
        setHeight(e.target.value);
        onUpdateCanvas({ width, height: e.target.value });
    };

    const handleColumnsChange = (e) => {
        setColumns(e.target.value);
    };

    return (
        <div className="text-xs properties">
            <h2 className="text-lg font-bold mb-4">Page Setup Properties</h2>

            {/* Page setup properties */}
            <div className="grid grid-cols-2 gap-2 mb-4">
                <label>Width</label>
                <input
                    className="border p-1"
                    type="text"
                    value={width}
                    onChange={handleWidthChange}
                />

                <label>Height</label>
                <input
                    className="border p-1"
                    type="text"
                    value={height}
                    onChange={handleHeightChange}
                />

                <label>Columns</label>
                <input
                    className="border p-1"
                    type="text"
                    value={columns}
                    onChange={handleColumnsChange}
                />
            </div>

            {/* Typography */}
            <h2 className="text-lg font-bold mb-2">Typography</h2>
            <div className="grid grid-cols-2 gap-2 mb-4">
                <label>Font-family</label>
                <input className="border p-1" type="text" value="Roboto" />
                <label>Font-size</label>
                <input className="border p-1" type="text" value="14px" />
            </div>

            {/* Border and Color */}
            <div className="grid grid-cols-2 gap-2 mb-4">
                <label>Border</label>
                <input className="border p-1" type="text" value="Solid" />
                <label>Color</label>
                <input className="border p-1" type="text" value="Black" />
            </div>

            {/* Layer Properties */}
            <h2 className="text-lg font-bold mb-2">Layers Properties</h2>
            <div className="grid grid-cols-3 gap-2 mb-4">
                <label>Width</label>
                <input className="col-span-2 border p-1" type="text" value="50px" />
                <label>Height</label>
                <input className="col-span-2 border p-1" type="text" value="50px" />
                <label>Top</label>
                <input className="col-span-2 border p-1" type="text" value="20px" />
                <label>Bottom</label>
                <input className="col-span-2 border p-1" type="text" value="10px" />
                <label>Left</label>
                <input className="col-span-2 border p-1" type="text" value="30px" />
                <label>Right</label>
                <input className="col-span-2 border p-1" type="text" value="30px" />
            </div>
        </div>
    );
};

export default Properties;
