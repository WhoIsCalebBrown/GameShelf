import React, { useState } from 'react';

const TruncatedText = ({ text, maxLength = 200 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (text.length <= maxLength) return <p>{text}</p>;

    const truncatedText = text.slice(0, maxLength);

    return (
        <div>
            <p>
                {isExpanded ? text : `${truncatedText}...`}
            </p>
            <span
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-500 hover:text-blue-700 cursor-pointer mb-4"
                style={{ display: 'block', textAlign: 'right' }}
            >
                {isExpanded ? 'Show less' : 'Read more'}
            </span>
        </div>
    );
};

export default TruncatedText;
