// DropTarget.js
import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';

const DropTarget = ({ index, moveComponent }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'COMPONENT',
    hover(item, monitor) {
      if (!ref.current) {
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

  drop(ref);

  return <div ref={ref} className="drop-target"></div>;
};

export default DropTarget;
