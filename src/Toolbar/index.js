import React, { useContext } from 'react';
import TutorialContext from '../TutorialContext';
import "./Toolbar.css";

const Toolbar = () => {
    const {title, tags, handleTitleChange, handleTagsChange, handleSubmitTutorial, description,
        descriptionImage,handleDescriptionChange,handleDescriptionImageChange,descriptionImageName } = useContext(TutorialContext);
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
      <div className="toolbar-item">
        <label htmlFor="tutorial-description">Description:</label>
        <textarea
          id="tutorial-description"
          placeholder="Enter tutorial description"
          onChange={(e) => handleDescriptionChange(e.target.value)}
          value={description}
        />
      </div>
      <div className="toolbar-item">
  <label htmlFor="tutorial-description-image">Description Image:</label>
  <div className="file-input-wrapper">
    <label className="file-input-label">
      Choose File
      <input type="file" className="custom-file-input" id="tutorial-description-image" onChange={(e) => handleDescriptionImageChange(e.target.files[0])} />
    </label>
  </div>
  {descriptionImageName && ( // Add this block
          <div className="no-file-chosen">
            {descriptionImageName}
          </div>
        )}
</div>


      <button className="submit-tutorial-button" onClick={handleSubmitTutorial}>
        Submit Tutorial
      </button>
     
    </div>
  );
};

export default Toolbar;
