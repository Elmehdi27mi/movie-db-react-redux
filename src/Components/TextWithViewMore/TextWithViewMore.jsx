import React, { useState } from 'react';

function TextWithViewMore({ text = "", maxLength = 290 }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const shouldShowToggle = text.length > maxLength;
    const displayText = isExpanded || !shouldShowToggle ? text : `${text.slice(0, maxLength)}...`;

    return (
        <div>
            <p className='font-secondary'>
                {displayText}
                {shouldShowToggle && (
                    <a onClick={toggleExpand} className="text-primary cursor-pointer">
                        {isExpanded ? 'View Less' : 'View More'}
                    </a>
                )}
            </p>
        </div>
    );
}

export default TextWithViewMore;
