import React from 'react';
import Canvas from '../Canvas';
import Toolbar from "../Toolbar";
import './TutorialCreator.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
import TutorialContext from '../TutorialContext';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useParams } from 'react-router-dom';


function TutorialCreator() {
  const { id } = useParams(); 
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionImage, setDescriptionImage] = useState(null);
  const [descriptionImageName, setDescriptionImageName] = useState("");

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };

  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };

  const handleDescriptionChange = (newDescription) => setDescription(newDescription);

  const handleDescriptionImageChange = (file) => {
    setDescriptionImage(file);
    setDescriptionImageName(file.name); // Add this line
  };

  const handleSubmitTutorial = async () => {
    const token = localStorage.getItem('jwtToken');
   

    // Decode JWT token to get the email
    const decodedToken = jwt_decode(token);
    const userEmail = decodedToken.sub;

    // Convert the image to a base64 encoded string
    const base64Image = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(descriptionImage);
  });

    const tutorialData = {
      authorId:userEmail,
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()),
      content: JSON.stringify(content),
      descriptionImage: base64Image,
      ...(id ? { responseTo: id } : {}),
    };
    console.log(tutorialData)

    try {
        const response = await axios.post('http://localhost:53625/hub/tutorial/createPost', tutorialData);
        console.log('Tutorial saved:', response.data);
      } catch (error) {
        console.error('Error saving tutorial:', error);
      }
  };

  const contextValue = {
    content,
    title,
    tags,
    description,
    descriptionImageName,
    descriptionImage,
    handleContentChange,
    handleTitleChange,
    handleTagsChange,
    handleDescriptionChange,
    handleDescriptionImageChange,
    handleSubmitTutorial,
  };

  return (
    <TutorialContext.Provider value={contextValue}>
      <div className="tutorial-creator">
        <Toolbar />
        <DndProvider backend={HTML5Backend}>
          <Canvas />
        </DndProvider>
      </div>
    </TutorialContext.Provider>
  );
}

export default TutorialCreator;
