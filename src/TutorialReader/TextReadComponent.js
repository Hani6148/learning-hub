import React from 'react';
import './TextReadComponent.css';

function TextReadComponent({ content, width, height }) {
  console.log('TextReadComponent content let try to fix :', content);

  const containerStyles = {
    width:"80%",
    margin:"auto",
    marginTop:"5vh",
    marginBottom:"10vh",
    textAlign:"left",
    overflowY:"auto"

  };

  return (
    <div
      className="text-read-component"
      style={containerStyles}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default TextReadComponent;
