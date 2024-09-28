import React, { useState, useEffect } from 'react';
import EpaperCard from './EpaperCard';

const EpaperList = () => {
    const [epaperList, setEpaperList] = useState([]); // Initialize empty state

    useEffect(() => {
        // Fetch epaper data
        const fetchEpapers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/eNewsPage');
                const data = await response.json();
                console.log('Fetched epaper data:', data);  // Log the API response
                setEpaperList(data); // Set the data into state
            } catch (error) {
                console.error('Error fetching epapers:', error);
            }
        };

        fetchEpapers();
    }, []);

    return (
        <div>
            {epaperList.length === 0 ? (
                <p>No epapers found.</p>  // Fallback if no data
            ) : (
                epaperList.map((epaper, index) => (
                    <EpaperCard
                        key={index}
                        newstitle={epaper.newstitle}  // Pass the correct key for title
                        updated_at={epaper.updated_at}  // Pass the correct key for updated_at
                        newsid={epaper.newsid}
                        pageid={epaper.pageid}
                        pages={epaper.pages}
                    />
                ))
            )}
        </div>
    );
};

export default EpaperList;
