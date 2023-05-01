import React, { useContext } from 'react';
import TutorialContext from '../TutorialContext';
import "./Toolbar.css";

const Toolbar = () => {
    const {title, tags, handleTitleChange, handleTagsChange, handleSubmitTutorial } = useContext(TutorialContext);
  return (
    <div className="toolbar">
      <div className="toolbar-item">
        <label htmlFor="tutorial-title">Title:</label>
        <input type="text" id="tutorial-title" placeholder="Enter tutorial title" onChange={(e) => handleTitleChange(e.target.value)} value={title} />
      </div>
      <div className="toolbar-item">
        <label htmlFor="tutorial-tags">Tags:</label>
        <input type="text" id="tutorial-tags" placeholder="Enter tags" onChange={(e) => handleTagsChange(e.target.value)} value={tags} />
      </div>

      <button className="submit-tutorial-button" onClick={handleSubmitTutorial}>
        Update Tutorial
      </button>
     
    </div>
  );
};

export default Toolbar;
