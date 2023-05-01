import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TextReadComponent from './TextReadComponent';
import ImageReadComponent from './ImageReadComponent';
import CodeReadComponent from './CodeReadComponent';
import "./TutorialReader.css"

function TutorialReader() {
  const [tutorialData, setTutorialData] = useState({ });
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchTutorialData = async () => {
      try {
        const response = await axios.get(`http://localhost:53625/hub/tutorial/post/${id}`);
        const data = response.data;
        data.content = JSON.parse(data.content);

        console.log('Fetched tutorial data:', data);

        setTutorialData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tutorial data:', error);
      }
    };

    fetchTutorialData();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.error('hna nchouf', tutorialData);
  
  return (
    <div className="tutorial-reader">
      <h1 className='tutorial-reader-title'>{tutorialData.title}</h1>
      <div className="tutorial-meta">
        <img
          src={tutorialData.descriptionImage}
          alt={tutorialData.title}
          className="tutorial-description-image"
        />
        <p className="tutorial-author">
          By: {tutorialData.authorId} | {new Date(tutorialData.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div>
        {tutorialData.content.map((item, index) => {
          const { type, content, size } = item;
          switch (type) {
            case 'Text':
              return (
                <TextReadComponent
                  key={index}
                  content={content}
                  width={size.width}
                  height={size.height}
                />
              );
            case 'Image':
              return (
                <ImageReadComponent
                  key={index}
                  content={content}
                  width={size.width}
                  height={size.height}
                />
              );
            case 'Code':
              return (
                <CodeReadComponent
                  key={index}
                  content={content}
                  width={size.width}
                  height={size.height}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}

export default TutorialReader;
