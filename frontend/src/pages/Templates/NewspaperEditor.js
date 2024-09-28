import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CanvasContainer from './CanvasContainer';

// Custom hook to extract query parameters from the URL
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const NewspaperEditor = () => {
    const { newsid: paramNewsid, pageid: paramPageid } = useParams();
    const query = useQuery();

    // Check if there are query parameters; otherwise, use route parameters
    const newsid = paramNewsid || query.get('newsid');
    const pageid = paramPageid || query.get('pageid');
    const isEditMode = !!newsid && !!pageid; // Check if editing or adding new

    // Debugging log to check if the values are correct
    console.log('News ID:', newsid);
    console.log('Page ID:', pageid);

    return (
        <div>
            {/* Pass the extracted newsid, pageid, and edit mode flag as props to CanvasContainer */}
            <CanvasContainer newsid={newsid} pageid={pageid} isEditMode={isEditMode} />
        </div>
    );
};

export default NewspaperEditor;
