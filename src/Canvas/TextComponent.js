// TextComponent.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './TextComponent.css';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const TextComponent = (props) => {
  const [value, setValue] = useState(props.content);
  const [size, setSize] = useState(props.size || { width: 735, height: 450 });

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'align',
    'list',
    'bullet',
    'blockquote',
    'code-block',
    'link',
    'image',
  ];

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    props.onDelete();
  };

  const handleContentChange = (newValue) => {
    setValue(newValue);
    props.updateContent(newValue); // Update this line
  };

  const handleSizeChange = (newSize) => {
    setSize(newSize);
    props.updateSize(newSize); // Update this line
  };

  return (
    <div className="text-component">
      <span className="delete-icon" onClick={handleDeleteClick}>
        X
      </span>
      <ResizableBox
        minConstraints={[50, 50]}
        maxConstraints={[1500, 1500]}
        resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
        onResizeStop={(e, data) => handleSizeChange({ width: data.size.width, height: data.size.height })}
      >
        <ReactQuill
          value={value}
          onChange={handleContentChange}
          modules={modules}
          formats={formats}
          style={{ width: '100%', height: '100%' }}
        />
      </ResizableBox>
    </div>
  );
};

export default TextComponent;
