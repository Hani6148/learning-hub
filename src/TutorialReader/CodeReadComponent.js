// CodeReadComponent.js
import React from 'react';
import './CodeReadComponent.css';


function CodeReadComponent({ content, size = { width: 735, height: 150 } }) {
  console.log('CodeReadComponent content:', content);

  return (
    <div
      className="code-read-component"
      style={{
        width: size.width,
        height: size.height,
        overflow: 'auto',
        position: 'relative',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#1E1E1E', // VS Code dark theme background color
        color: '#D4D4D4', // Light text color
        padding: '0.5em',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle box-shadow,
        margin:"auto",
        textAlign:"justify"
      }}
    >
      <pre style={{ margin: 0, padding: '0.5em', fontFamily: 'monospace' }}>
        <code
          dangerouslySetInnerHTML={{ __html: content }}
          style={{
            display: 'block',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        />
      </pre>
    </div>
  );
}

export default CodeReadComponent;
