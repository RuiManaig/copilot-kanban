'use client';

import { useMemo, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import Column from './Column';
import { Card, ColumnData, initialColumns } from './types';

function findColumnByCard(columns: ColumnData[], cardId: string) {
  return columns.find((column) => column.cards.some((card) => card.id === cardId));
}

function removeCard(columns: ColumnData[], cardId: string) {
  return columns.map((column) => ({
    ...column,
    cards: column.cards.filter((card) => card.id !== cardId),
  }));
}

export default function Board() {
  const [columns, setColumns] = useState<ColumnData[]>(initialColumns);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const cardIds = useMemo(() => columns.flatMap((column) => column.cards.map((card) => card.id)), [columns]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id as string;
    const overId = over.id as string;
    if (activeId === overId) return;

    const activeColumn = findColumnByCard(columns, activeId);
    const overColumn = columns.find((column) => column.id === overId) ?? findColumnByCard(columns, overId);
    if (!activeColumn || !overColumn) return;
    const activeCard = activeColumn.cards.find((card) => card.id === activeId);
    if (!activeCard) return;

    if (activeColumn.id === overColumn.id && overColumn.cards.some((card) => card.id === overId)) {
      const oldIndex = activeColumn.cards.findIndex((card) => card.id === activeId);
      const newIndex = activeColumn.cards.findIndex((card) => card.id === overId);
      setColumns((current) =>
        current.map((column) => {
          if (column.id !== activeColumn.id) return column;
          return {
            ...column,
            cards: arrayMove(column.cards, oldIndex, newIndex),
          };
        }),
      );
      return;
    }

    setColumns((current) =>
      current.map((column) => {
        if (column.id === activeColumn.id) {
          return {
            ...column,
            cards: column.cards.filter((card) => card.id !== activeId),
          };
        }
        if (column.id === overColumn.id) {
          return {
            ...column,
            cards: [...column.cards, activeCard],
          };
        }
        return column;
      }),
    );
  };

  const handleAddCard = (columnId: string, title: string, details: string) => {
    const newCard: Card = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      details: details.trim(),
    };
    if (!newCard.title) return;

    setColumns((current) =>
      current.map((column) =>
        column.id === columnId ? { ...column, cards: [...column.cards, newCard] } : column,
      ),
    );
  };

  const handleDeleteCard = (cardId: string) => {
    setColumns((current) => removeCard(current, cardId));
  };

  const handleRenameColumn = (columnId: string, title: string) => {
    setColumns((current) =>
      current.map((column) => (column.id === columnId ? { ...column, title } : column)),
    );
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="board-shell">
        {columns.map((column) => (
          <SortableContext key={column.id} items={column.cards.map((card) => card.id)} strategy={rectSortingStrategy}>
            <Column
              column={column}
              onAddCard={handleAddCard}
              onDeleteCard={handleDeleteCard}
              onRenameColumn={handleRenameColumn}
            />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
}
