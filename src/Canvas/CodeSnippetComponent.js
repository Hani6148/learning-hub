import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import "./CodeSnippetComponent.css"

const CodeSnippetComponent = (props) => {
  const initialContent = typeof props.content === 'string' ? props.content : JSON.stringify(props.content);
  const [codeSnippet, setCodeSnippet] = useState(initialContent);

  const handleCodeSnippetChange = (newValue) => {
    setCodeSnippet(newValue);
    props.updateContent(newValue);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    props.onDelete();
  };

  const handleSizeChange = (width, height) => {
    props.updateSize(width, height);
  };

  return (
    <div className="code-snippet-component">
      <span className="delete-icon" onClick={handleDeleteClick}>
        X
      </span>
      <ResizableBox
        width={735}
        height={300}
        minConstraints={[100, 100]}
        maxConstraints={[1500, 1500]}
        onResizeStop={(event, data) => {
          handleSizeChange(data.size.width, data.size.height);
        }}
        resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
      >
        <AceEditor
          mode="javascript"
          theme="monokai"
          onChange={handleCodeSnippetChange}
          value={codeSnippet}
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="100%"
        />
      </ResizableBox>
    </div>
  );
};

export default CodeSnippetComponent;
