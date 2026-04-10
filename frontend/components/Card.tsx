'use client';

import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { Card } from './types';

type CardProps = {
  card: Card;
  onDelete: () => void;
};

export default function CardItem({ card, onDelete }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={`task-card ${isDragging ? 'dragging' : ''}`} {...attributes} {...listeners}>
      <h3 className="task-card-title">{card.title}</h3>
      <p className="task-card-details">{card.details}</p>
      <div className="task-actions">
        <button type="button" className="delete-button" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
