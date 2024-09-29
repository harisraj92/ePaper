import React, { useContext, useRef, useState } from "react";
import { CanvasContext } from "./CanvasContext";

const ImageElement = (props) => {
    const { content, id } = props;
    const { actions } = useContext(CanvasContext);
    const uploadRef = useRef(null);
    const [imageDimensions, setImageDimensions] = useState({ width: '100%', height: '100%' });

    const getResizedDimensions = (image) => {
        const maxWidth = 300; // Max width for the image
        const maxHeight = 300; // Max height for the image
        let width = image.naturalWidth;
        let height = image.naturalHeight;

        // Calculate aspect ratio and adjust dimensions
        if (width > height) {
            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }
        }

        return { width, height };
    };

    const imageUpload = async (e) => {
        const file = e?.target?.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                // Upload image to backend
                const response = await fetch('http://localhost:5000/api/uploadImage', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                console.log(data);

                if (data.imagePath) {
                    // Construct the full URL for the image
                    const imagePath = `http://localhost:5000${data.imagePath}`;

                    // Create a new Image object to get natural dimensions
                    const img = new Image();
                    img.src = imagePath;

                    img.onload = () => {
                        const { width, height } = getResizedDimensions(img);
                        setImageDimensions({ width, height });

                        // Update canvas data with the correct image path and dimensions
                        actions?.updateCanvasData({
                            id,
                            content: imagePath,
                            dimension: {
                                width: `${width}px`,
                                height: `${height}px`,
                            },
                        });
                    };
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const triggerUpload = () => {
        const element = uploadRef?.current;
        if (element) {
            element.click();
        }
    };

    const renderUploadContent = () => {
        return (
            <>
                <div className="image-upload-container" onClick={triggerUpload}>
                    <div>Upload Image</div>
                </div>
                <input
                    ref={uploadRef}
                    type="file"
                    id="imageFile"
                    name="imageFile"
                    accept=".jpg, .png, .jpeg"
                    onChange={imageUpload}

                />
            </>
        );
    };

    const renderImage = () => {
        return (
            <div
                style={{
                    backgroundImage: `url(${content})`,
                    backgroundSize: "contain",
                    width: "100%",
                    height: "100%",
                    backgroundRepeat: "no-repeat",

                }}
            />
        );
    };

    return <>{!content ? renderUploadContent() : renderImage()}</>;
};

export default ImageElement;
