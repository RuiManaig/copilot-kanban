export type Card = {
  id: string;
  title: string;
  details: string;
};

export type ColumnData = {
  id: string;
  title: string;
  cards: Card[];
};

export const initialColumns: ColumnData[] = [
  {
    id: 'todo',
    title: 'To Do',
    cards: [
      {
        id: 'task-1',
        title: 'Refine sprint plan',
        details: 'Review priorities and align tasks for the week.',
      },
      {
        id: 'task-2',
        title: 'Collect requirements',
        details: 'Confirm board actions and user flows with the team.',
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    cards: [
      {
        id: 'task-3',
        title: 'Build board UI',
        details: 'Create the column layout, cards, and styles.',
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    cards: [
      {
        id: 'task-4',
        title: 'Test drag interactions',
        details: 'Verify cards can move smoothly between columns.',
      },
    ],
  },
  {
    id: 'blocked',
    title: 'Blocked',
    cards: [
      {
        id: 'task-5',
        title: 'Resolve layout bugs',
        details: 'Fix mobile spacing and title input alignment.',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      {
        id: 'task-6',
        title: 'Create initial plan',
        details: 'Define product scope and implementation checklist.',
      },
    ],
  },
];
