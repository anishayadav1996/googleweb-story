import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WebStory = ({ storyId }) => {
    const [storyHtml, setStoryHtml] = useState('');

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/stories/${storyId}`);
                setStoryHtml(response.data);
            } catch (error) {
                console.error('Error fetching the story:', error);
            }
        };
        fetchStory();
    }, [storyId]);

    return (
        <div>
            {storyHtml ? (
                <iframe
                    title={`Story ${storyId}`}
                    srcDoc={storyHtml}
                    style={{ width: '100%', height: '500px', border: 'none' }}
                ></iframe>
            ) : (
                <p>Loading Story...</p>
            )}
        </div>
    );
};

export default WebStory;
