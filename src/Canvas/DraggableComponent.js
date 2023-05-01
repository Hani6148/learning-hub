import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableComponent = ({ id, index, component, children }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'component', id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
};

export default DraggableComponent;
