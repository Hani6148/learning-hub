import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const ImageComponent = (props) => {
  const [imageSrc, setImageSrc] = useState(props.content);
  const [size, setSize] = useState(props.size || { width: 735, height: 450 });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
        props.updateContent(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    props.onDelete();
  };

  const handleImageClick = (event) => {
    event.stopPropagation();
    event.target.nextSibling.click();
  };

  const handleSizeChange = (newSize) => {
    setSize(newSize);
    props.updateSize(newSize);
  };

  return (
    <div className="image-component">
      <span className="delete-icon" onClick={handleDeleteClick}>
        X
      </span>
      <ResizableBox
        width={size.width}
        height={size.height}
        minConstraints={[50, 50]}
        maxConstraints={[1500, 1500]}
        resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
        onResizeStop={(e, data) => handleSizeChange({ width: data.size.width, height: data.size.height })}
      >
        <img
          src={imageSrc}
          alt="Tutorial"
          onClick={handleImageClick}
          style={{ width: '100%', height: '100%', objectFit: 'fill' }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </ResizableBox>
    </div>
  );
};

export default ImageComponent;
