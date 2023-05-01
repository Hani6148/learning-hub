import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Canvas from '../Canvas';
import ToolbarUpdate from '../ToolbarUpdate';
import './TutorialUpdate.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TutorialContext from '../TutorialContext';
import axios from 'axios';

function TutorialUpdate() {
  const { id } = useParams();
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    const fetchTutorialData = async () => {
      try {
        const response = await fetch(`http://localhost:53625/hub/tutorial/post/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const responseData = await response.json();
        const { title, tags, content } = responseData;

        setTitle(title);
        setTags(tags.join(', '));
        setContent(JSON.parse(content));
      } catch (error) {
        console.error('Error fetching tutorial data:', error);
      }
    };

    fetchTutorialData();
  }, [id]);


  

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };

  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };

  const handleSubmitTutorial = async () => {
    const tutorialData = {
      title,
      tags: tags.split(',').map(tag => tag.trim()),
      content: JSON.stringify(content),
    };
    console.log(tutorialData)

    try {
        const response = await axios.put(`http://localhost:53625/hub/tutorial/post/${id}`, tutorialData);
        console.log('Tutorial updated:', response.data);
      } catch (error) {
        console.error('Error updating tutorial:', error);
      }
  };

  const contextValue = {
    content,
    title,
    tags,
    handleContentChange,
    handleTitleChange,
    handleTagsChange,
    handleSubmitTutorial,
  };

  return (
    <TutorialContext.Provider value={contextValue}>
      <div className="tutorial-update">
        <ToolbarUpdate />
        <DndProvider backend={HTML5Backend}>
          <Canvas />
        </DndProvider>
      </div>
    </TutorialContext.Provider>
  );
}

export default TutorialUpdate;
