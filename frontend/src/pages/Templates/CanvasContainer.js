import React, { useCallback, useRef, useState, useEffect } from "react";
import CanvasComponent from './CanvasComponent';
import { CanvasContext } from "./CanvasContext";
import Toolbar from "./Toolbar";
import Pagination from "./Pagination";

const getInitialData = (data, type = "TEXT") => {
    return {
        type: type,
        id: `${type}__${Date.now()}__${data.length}`,
        position: {
            top: 100,
            left: 100
        },
        dimension: {
            width: "150",
            height: type === "TEXT" ? "50" : "150"
        },
        content: type === "TEXT" ? "<Sample Text>" : ""
    };
};

const getInitialHeading = (data, type = "HEADING") => {
    return {
        type: type,
        id: `${type}__${Date.now()}__${data.length}`,
        position: {
            top: 100,
            left: 100
        },
        dimension: {
            width: "150",
            height: type === "HEADING" ? "50" : "500"
        },
        content: type === "HEADING" ? "<h1>Text Heading Here</h1> <h2>Sub Heading Here </h2> <p>Sample text</p>" : ""
    };
};

const CanvasContainer = () => {
    const [canvasData, setCanvasData] = useState([]); // Canvas data state
    const [activeSelection, setActiveSelection] = useState(new Set()); // Active selection
    const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 }); // Default canvas size
    const [enableQuillToolbar, setEnableQuillToolbar] = useState(false);
    const [customWidth, setCustomWidth] = useState(800);
    const [customHeight, setCustomHeight] = useState(600);
    const [isCustom, setIsCustom] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1); // Initial zoom level
    const [columns, setColumns] = useState(8); // Default column count

    const containerRef = useRef(null);
    const isSelectAll = useRef(false);

    // Fetch saved canvas data and size from backend when component mounts
    const fetchCanvasData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/editor/last');
            if (!response.ok) {
                throw new Error('Failed to fetch canvas data');
            }

            const data = await response.json();
            const { content, width, height } = data;

            // Set the canvas content and size from the saved data
            setCanvasData(JSON.parse(content));
            setCanvasSize({ width, height });
        } catch (error) {
            console.error('Error fetching canvas data:', error);
            alert('Error loading canvas data. Please try again later.');
        }
    };

    // Fetch canvas data and size on mount
    useEffect(() => {
        fetchCanvasData();
    }, []);

    // Save canvas data function including size
    const saveCanvasData = async (canvasId = null) => {
        try {
            const id = canvasId || Date.now(); // Use Date.now() to generate a unique ID if canvasId is not provided
            const content = JSON.stringify(canvasData); // Convert canvasData to JSON string
            const width = canvasSize.width;  // Get current canvas width
            const height = canvasSize.height; // Get current canvas height

            const response = await fetch('http://localhost:5000/api/editor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, content, width, height }) // Send the canvas data and screen size
            });

            if (!response.ok) {
                throw new Error('Error saving canvas data');
            }

            console.log('Canvas saved with id:', id);
        } catch (error) {
            console.error('Error saving canvas data:', error);
        }
    };

    // Predefined newspaper sizes with save
    const handleSizeChange = (e) => {
        const selectedSize = e.target.value;
        setIsCustom(false); // Reset custom size mode

        let newSize = { width: 800, height: 600 }; // Default size

        switch (selectedSize) {
            case 'Broadsheet':
                newSize = { width: 2362, height: 2953 };
                break;
            case 'Tabloid':
                newSize = { width: 1102, height: 1693 };
                break;
            case 'Berliner':
                newSize = { width: 1240, height: 1850 };
                break;
            case 'Compact':
                newSize = { width: 1170, height: 1654 };
                break;
            case 'custom':
                setIsCustom(true);
                break;
            default:
                newSize = { width: 800, height: 600 };
        }

        if (selectedSize !== 'custom') {
            setCanvasSize(newSize);
            saveCanvasData(); // Automatically save the new canvas size when changed
        }
    };

    const handleCustomResize = () => {
        setCanvasSize({ width: customWidth, height: customHeight });
        saveCanvasData(); // Save after custom size change
    };

    const updateCanvasData = (data) => {
        const currentDataIndex = canvasData.findIndex((canvas) => canvas.id === data.id) ?? -1;
        const updatedData = { ...canvasData?.[currentDataIndex], ...data };
        const newCanvasData = [...canvasData];
        newCanvasData.splice(currentDataIndex, 1, updatedData);
        setCanvasData(newCanvasData); // Update state with modified canvas data
    };

    const addElement = (type) => {
        const defaultData = getInitialData(canvasData, type);
        setCanvasData([...canvasData, { ...defaultData, type: type ?? "TEXT" }]);
        activeSelection.clear();
        activeSelection.add(defaultData.id);
        setActiveSelection(new Set(activeSelection));
    };

    const addHeading = (type) => {
        const defaultHeadingData = getInitialHeading(canvasData, type);
        setCanvasData([...canvasData, { ...defaultHeadingData, type: type ?? "HEADING" }]);
        activeSelection.clear();
        activeSelection.add(defaultHeadingData.id);
        setActiveSelection(new Set(activeSelection));
    };

    const deleteElement = useCallback(() => {
        setCanvasData([
            ...canvasData.filter((data) => {
                if (data.id && activeSelection.has(data.id)) {
                    activeSelection.delete(data.id);
                    return false;
                }
                return true;
            })
        ]);
        setActiveSelection(new Set(activeSelection));
    }, [activeSelection, canvasData]);

    const selectAllElement = useCallback(() => {
        isSelectAll.current = true;
        canvasData.map((data) => activeSelection.add(data.id || ""));
        setActiveSelection(new Set(activeSelection));
    }, [activeSelection, canvasData]);

    const handleZoomIn = () => {
        setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 2)); // Max zoom level of 2 (200%)
    };

    const handleZoomOut = () => {
        setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.5)); // Min zoom level of 0.5 (50%)
    };

    // Render grid layout with only columns
    const renderGrid = () => {
        const columnWidth = canvasSize.width / columns;
        return (
            <>
                {Array.from({ length: columns }, (_, index) => (
                    <div
                        key={`column-${index}`}
                        className="absolute"
                        style={{
                            left: `${index * columnWidth}px`,
                            width: '1px',
                            height: '100%',
                            backgroundColor: '#e0e0e0'
                        }}
                    />
                ))}
            </>
        );
    };

    const context = {
        actions: {
            setCanvasData,
            setActiveSelection,
            updateCanvasData,
            addElement,
            addHeading,
            saveCanvasData,
            setEnableQuillToolbar, // Add this to context actions
        },
        state: {
            canvasData,
            activeSelection
        }
    };

    const handleKeyDown = useCallback(
        (event) => {
            if (event.key === "Delete") {
                deleteElement();
            } else if (["a", "A"].includes(event.key) && event.ctrlKey) {
                event.preventDefault();
                selectAllElement();
            }
        },
        [deleteElement, selectAllElement]
    );

    const outSideClickHandler = () => {
        isSelectAll.current = false;
        setActiveSelection(new Set());
    };

    const handleMouseDown = useCallback(
        (event) => {
            if (!isSelectAll.current) {
                return;
            }
            outSideClickHandler();
            isSelectAll.current = false;
        },
        []
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleMouseDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleMouseDown);
        };
    }, [handleKeyDown, handleMouseDown]);

    return (
        <div ref={containerRef}>
            <CanvasContext.Provider value={context}>
                {/* Custom Size Inputs */}
                <div className="flex">
                    <div className="p-4">
                        <label className="mr-2">Select Paper Size:</label>
                        <select onChange={handleSizeChange} className="border p-2">
                            <option value="default">Default (800x600)</option>
                            <option value="Broadsheet">Broadsheet (2362x2953)</option>
                            <option value="Tabloid">Tabloid (1102x1693)</option>
                            <option value="Berliner">Berliner (1240x1850)</option>
                            <option value="Compact">Compact (1170x1654)</option>
                            <option value="custom">Custom Size</option>
                        </select>
                    </div>

                    {isCustom && (
                        <div className="p-4">
                            <label className="mr-2">Custom Width (px):</label>
                            <input
                                type="number"
                                value={customWidth}
                                onChange={(e) => setCustomWidth(Number(e.target.value))}
                                className="border p-2 mr-4"
                                min="100"
                            />
                            <label className="mr-2">Custom Height (px):</label>
                            <input
                                type="number"
                                value={customHeight}
                                onChange={(e) => setCustomHeight(Number(e.target.value))}
                                className="border p-2 mr-4"
                                min="100"
                            />
                            <button
                                onClick={handleCustomResize}
                                className="bg-blue-500 text-white p-2 rounded"
                            >
                                Apply Custom Size
                            </button>
                        </div>
                    )}

                    {/* Zoom In/Out Buttons */}
                    <div className="p-4">
                        <button
                            onClick={handleZoomOut}
                            className="bg-gray-300 text-black p-2 rounded mr-4"
                        >
                            Zoom Out (-)
                        </button>
                        <button
                            onClick={handleZoomIn}
                            className="bg-gray-300 text-black p-2 rounded"
                        >
                            Zoom In (+)
                        </button>
                    </div>
                </div>

                <Toolbar isEditEnable={enableQuillToolbar} saveCanvasData={() => saveCanvasData()} />
                {/* Canvas Container with Scrollable Feature */}
                <div
                    className="canvas-parent-container"
                    style={{
                        width: '900px',
                        height: '800px',
                        overflow: 'auto',
                        border: '2px solid #ddd',
                        marginTop: '20px',
                        position: 'relative'
                    }}
                >
                    <div
                        className="canvas-container m-8 p-8"
                        style={{
                            width: `${canvasSize.width}px`,
                            height: `${canvasSize.height}px`,
                            border: "1px solid black",
                            position: 'relative',
                            transform: `scale(${zoomLevel})`,
                            transformOrigin: 'top left'
                        }}
                    >
                        {renderGrid()}

                        {canvasData.map((canvas) => (
                            <CanvasComponent key={canvas.id} {...canvas} />
                        ))}
                    </div>

                    <div className="flex">
                        <Pagination />
                    </div>
                </div>
            </CanvasContext.Provider>
        </div>
    );
};

export default CanvasContainer;
