import {useRef, useEffect} from 'react';
import type { XYCoord } from 'dnd-core'
import { useDrag, useDrop } from 'react-dnd';
import {Grid2} from '@mui/material';

const style = {
  '&:hover': {
  //   border: '1px dashed gray',
  // padding: '0.5rem 1rem',
  // marginBottom: '.5rem',
  // backgroundColor: 'white',
  cursor: 'move',
  }
}

export default function DragBox({
  children,
  id, index, onMove,
  fullWidth
}: any) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<any, any, any>({
    accept: 'box',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: any, monitor: any) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'box',
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
      if (ref.current) preview(ref.current);
    }, [preview]);

  return (
    <Grid2 
      size={fullWidth ? 12 : 6}
      ref={drag(drop(ref))}
      data-handler-id={handlerId} 
      sx={{...style, opacity: isDragging ? 0.5 : 1}}
    >{children}</Grid2>
  );
}