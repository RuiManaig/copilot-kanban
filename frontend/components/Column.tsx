'use client';

import { useEffect, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import CardItem from './Card';
import { Card, ColumnData } from './types';

type ColumnProps = {
  column: ColumnData;
  onAddCard: (columnId: string, title: string, details: string) => void;
  onDeleteCard: (cardId: string) => void;
  onEditCard: (cardId: string, title: string, details: string) => void;
  onRenameColumn: (columnId: string, title: string) => void;
};

export default function Column({ column, onAddCard, onDeleteCard, onEditCard, onRenameColumn }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [newTitle, setNewTitle] = useState('');
  const [newDetails, setNewDetails] = useState('');

  useEffect(() => {
    setTitle(column.title);
  }, [column.title]);

  const startEditingTitle = () => {
    setTitle(column.title);
    setIsEditing(true);
  };

  const submitTitle = () => {
    const trimmed = title.trim();
    if (trimmed && trimmed !== column.title) {
      onRenameColumn(column.id, trimmed);
    }
    setIsEditing(false);
  };

  const cancelTitleEdit = () => {
    setTitle(column.title);
    setIsEditing(false);
  };

  const submitCard = () => {
    if (!newTitle.trim()) return;
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
            onKeyDown={(event) => event.key === 'Enter' && submitTitle()}
            aria-label={`Edit title for ${column.title}`}
            autoFocus
          />
        ) : (
          <h2 className="column-title">{column.title}</h2>
        )}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="button" className="edit-button" onClick={isEditing ? submitTitle : startEditingTitle}>
            {isEditing ? 'Save' : 'Rename'}
          </button>
          {isEditing ? (
            <button type="button" className="cancel-button" onClick={cancelTitleEdit}>
              Cancel
            </button>
          ) : null}
        </div>
      </div>

      <div className="column-meta">
        <div className="card-list">
          {column.cards.map((card: Card) => (
            <CardItem
              key={card.id}
              card={card}
              onDelete={() => onDeleteCard(card.id)}
              onEdit={(updatedTitle, updatedDetails) => onEditCard(card.id, updatedTitle, updatedDetails)}
            />
          ))}
        </div>

        <div className="add-card-panel">
          <input
            placeholder="Card title"
            className="field-input"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                submitCard();
              }
            }}
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
