import React, { useState } from 'react';

const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
};

const starContainerStyle = {
    display: "flex",
    gap: "3px",
    marginTop: "10px"
}

function StarRateing({ maxRating = 5, color = '#fcc419', size = 48, }) {

    const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(0);

    const textStyle = {
        // lineHeight: "1",
        margin: "0",
        color,
        fontSize: `${size / 1.5 }px`,
    }

  return (
    <>
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => (
                    <Star key={i}
                        onRate={() => setRating(i+1)}
                        onHoverIn={() => setTempRating(i+1)}
                        onHoverOut={() => setTempRating(0)}
                        color={color}
                        size={size}
                      full={tempRating ? tempRating >= i + 1 : rating >= i+1} />
                ))}
            </div>
            <p style={textStyle}>{tempRating || rating || ''}</p>
        </div>
        {/* <p>This movie was rated {rating} stars</p> */}
    </>
  )
}

export default StarRateing


function Star({ onRate, full, onHoverIn, onHoverOut,
    color, size }) {

    const starStyle = {
        with: `${size}px`,
        height: `${size}px`,
        display: "block",
        cursor: "pointer",
        color,
    }

    return (
      <span role="button" style={starStyle} onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      >
        {full ? (
          <i className="fa-solid fa-star fs-5"></i>
        ) : (
          <i className="fa-regular fa-star fs-5"></i>
        )}
      </span>
    );
}