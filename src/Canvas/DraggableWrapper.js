// DraggableWrapper.js
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DraggableWrapper = ({ id, index, component, children, moveComponent }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'component',
    hover(item, monitor) {
      if (!ref.current || !item) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveComponent(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'component', id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
};

export default DraggableWrapper;
