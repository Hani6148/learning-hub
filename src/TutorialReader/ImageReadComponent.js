// ImageReadComponent.js
import React from 'react';

const ImageReadComponent = ({ content, width, height }) => {
    console.log("here is the size:"+ height +" + "+ width)
  return (
    <div className="image-read-component" style={{ position: 'relative',marginBottom:"10vh",marginTop:"5vh" }}>
      <img
        src={content}
        alt="Tutorial"
        style={{
          width: width, // Set the width to the provided size
          height: height, // Set the height to the provided size
         
          objectFit: 'cover', // Fill the space while maintaining the aspect ratio
        }}
      />
    </div>
  );
};

export default ImageReadComponent;
