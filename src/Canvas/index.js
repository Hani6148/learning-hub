import React, { useContext } from "react";
import "./Canvas.css";
import TextComponent from "./TextComponent";
import ImageComponent from "./ImageComponent";
import CodeSnippetComponent from "./CodeSnippetComponent";
import TutorialContext from "../TutorialContext";

const Canvas = () => {
  const { content, handleContentChange } = useContext(TutorialContext);

  const addComponent = (type) => {
    const initialContent = {
      Text: "Text content",
      Image: "https://www.calumetelectronics.com/wp-content/uploads/2020/08/placeholder.jpg",
      Code: { content: "const example = 'This is a code snippet';" },
    };
    const initialSize = {
      Text: { width: 735, height: 150 },
      Image: { width: 735, height: 450 },
      Code: { width: 735, height: 150 },
    };

    handleContentChange([
      ...content,
      {
        id: Date.now(),
        type,
        content: initialContent[type],
        size: initialSize[type],
      },
    ]);
  };

  

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const onDrop = (e, index) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData("text/plain");
    if (draggedIndex === index) return;

    const newContent = [...content];
    const temp = newContent[draggedIndex];
    newContent[draggedIndex] = newContent[index];
    newContent[index] = temp;

    handleContentChange(newContent);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const deleteComponent = (id) => {
    handleContentChange(content.filter((component) => component.id !== id));
  };

  const renderComponent = (component, index) => {
    if (!component) {
      return null;
    }

    const { id, type, size } = component;
    const updateContent = (id, newContent) => {
        const updatedContent = content.map((component) => {
          if (component.id === id) {
            return { ...component, content: newContent };
          }
          return component;
        });
        handleContentChange(updatedContent);
      };
      
      const updateSize = (id, newSize) => {
        const updatedContent = content.map((component) => {
          if (component.id === id) {
            return { ...component, size: newSize };
          }
          return component;
        });
        handleContentChange(updatedContent);
      };
      
      
      switch (type) {
        case "Text":
          return (
            <TextComponent
              id={id}
              key={id}
              content={component.content}
              size={size}
              updateContent={(newContent) => updateContent(id, newContent)}
              updateSize={(newSize) => updateSize(id, newSize)}
              onDelete={() => deleteComponent(id)}
            />
          );
        case "Image":
          return (
            <ImageComponent
              id={id}
              key={id}
              content={component.content}
              size={size}
              updateContent={(newContent) => updateContent(id, newContent)}
              updateSize={(newSize) => updateSize(id, newSize)}
              onDelete={() => deleteComponent(id)}
            />
          );
        case "Code":
          return (
            <CodeSnippetComponent
              id={id}
              key={id}
              content={component.content}
              size={size}
              updateContent={(newContent) => updateContent(id, newContent)}
              updateSize={(newSize) => updateSize(id, newSize)}
              onDelete={() => deleteComponent(id)}
            />
          );
        default:
          return null;
      }

  
  };

  return (
    <div className="canvas-container">
      <div className="canvas" onClick={() => console.log("Canvas clicked")}>
        {content.map((component, index) => {
          if (!component) {
            return null;
          }
          return (
            <div
              key={component.id}
              draggable
              onDragStart={(e) => onDragStart(e, index)}
              onDrop={(e) => onDrop(e, index)}
              onDragOver={onDragOver}
              className="canvas-component"
            >
              {renderComponent(component, index)}
            </div>
          );
        })}
      </div>
      <div className="component-toolbar">
      <button className="component-button" onClick={() => addComponent("Text")}>
          Add Text
        </button>
        <button className="component-button" onClick={() => addComponent("Image")}>
          Add Image
        </button>
        <button className="component-button" onClick={() => addComponent("Code")}>
          Add Code
        </button>
      </div>
    </div>
  );
};

export default Canvas;
