'use client';

import { useEffect, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { Card } from './types';

type CardProps = {
  card: Card;
  onDelete: () => void;
  onEdit: (title: string, details: string) => void;
};

export default function CardItem({ card, onDelete, onEdit }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.id });
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [details, setDetails] = useState(card.details);

  useEffect(() => {
    setTitle(card.title);
    setDetails(card.details);
  }, [card.title, card.details]);

  const submitEdit = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    onEdit(trimmedTitle, details.trim());
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setTitle(card.title);
    setDetails(card.details);
    setIsEditing(false);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task-card ${isDragging ? 'dragging' : ''}`}
      {...attributes}
      {...(!isEditing ? listeners : {})}
    >
      {isEditing ? (
        <>
          <input
            className="task-card-input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            aria-label="Edit card title"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                submitEdit();
              }
            }}
          />
          <textarea
            className="task-card-textarea"
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            aria-label="Edit card details"
          />
        </>
      ) : (
        <>
          <h3 className="task-card-title">{card.title}</h3>
          <p className="task-card-details">{card.details}</p>
        </>
      )}
      <div className="task-actions">
        {isEditing ? (
          <>
            <button type="button" className="hero-edit-button" onClick={submitEdit} aria-label="Save card edits">
              ✔
            </button>
            <button type="button" className="cancel-button" onClick={cancelEdit} aria-label="Cancel card edits">
              ✕
            </button>
          </>
        ) : (
          <>
            <button type="button" className="hero-edit-button" onClick={() => setIsEditing(true)} aria-label="Edit card">
              ✎
            </button>
            <button type="button" className="delete-button" onClick={onDelete} aria-label="Delete card">
              🗑
            </button>
          </>
        )}
      </div>
    </div>
  );
}
