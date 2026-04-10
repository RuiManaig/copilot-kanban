'use client';

import { useEffect, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import CardItem from './Card';
import { Card, ColumnData } from './types';

type ColumnProps = {
  column: ColumnData;
  onAddCard: (columnId: string, title: string, details: string) => void;
  onDeleteCard: (cardId: string) => void;
  onRenameColumn: (columnId: string, title: string) => void;
};

export default function Column({ column, onAddCard, onDeleteCard, onRenameColumn }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [newTitle, setNewTitle] = useState('');
  const [newDetails, setNewDetails] = useState('');

  useEffect(() => {
    setTitle(column.title);
  }, [column.title]);

  const submitTitle = () => {
    const trimmed = title.trim();
    if (trimmed && trimmed !== column.title) {
      onRenameColumn(column.id, trimmed);
    }
    setIsEditing(false);
  };

  const submitCard = () => {
    onAddCard(column.id, newTitle, newDetails);
    setNewTitle('');
    setNewDetails('');
  };

  return (
    <article ref={setNodeRef} className={`column-card ${isOver ? 'column-drop-target over' : ''}`}>
      <div className="column-header">
        {isEditing ? (
          <input
            className="column-title-input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onBlur={submitTitle}
            onKeyDown={(event) => event.key === 'Enter' && submitTitle()}
            aria-label={`Edit title for ${column.title}`}
            autoFocus
          />
        ) : (
          <h2 className="column-title">{column.title}</h2>
        )}
        <button type="button" className="edit-button" onClick={() => setIsEditing((current) => !current)}>
          {isEditing ? 'Save' : 'Rename'}
        </button>
      </div>

      <div className="column-meta">
        <div className="card-list">
          {column.cards.map((card: Card) => (
            <CardItem key={card.id} card={card} onDelete={() => onDeleteCard(card.id)} />
          ))}
        </div>

        <div className="add-card-panel">
          <input
            placeholder="Card title"
            className="field-input"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
          <textarea
            placeholder="Details"
            className="field-textarea"
            value={newDetails}
            onChange={(event) => setNewDetails(event.target.value)}
          />
          <button type="button" className="add-button" onClick={submitCard}>
            Add card
          </button>
        </div>
      </div>
    </article>
  );
}
