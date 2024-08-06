import React, { useState } from 'react';

const TruncatedText = ({ text, maxLength = 200 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (text.length <= maxLength) return <p>{text}</p>;

    const truncatedText = text.slice(0, maxLength);

    return (
        <div>
            <p>
                {isExpanded ? text : `${truncatedText}...`}
                <span
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px' }}
                >
                    {isExpanded ? ' Show less' : ' Read more'}
                </span>
            </p>
        </div>
    );
};

export default TruncatedText;
