'use client';

import { useEffect, useState } from 'react';
import Board from '../components/Board';

type HeroField = 'eyebrow' | 'headline' | 'description';

const HERO_STORAGE_KEY = 'kanban-hero-content';
const THEME_STORAGE_KEY = 'kanban-theme-choice';

const DEFAULT_HERO = {
  eyebrow: 'Kanban board',
  headline: 'Single-board project manager',
  description:
    'Keep work moving in one clean board with five editable columns, draggable cards, and fast card creation.',
};

export default function Home() {
  const [eyebrow, setEyebrow] = useState(DEFAULT_HERO.eyebrow);
  const [headline, setHeadline] = useState(DEFAULT_HERO.headline);
  const [description, setDescription] = useState(DEFAULT_HERO.description);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [editing, setEditing] = useState<HeroField | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedHero = window.localStorage.getItem(HERO_STORAGE_KEY);
    if (savedHero) {
      try {
        const parsed = JSON.parse(savedHero) as Partial<typeof DEFAULT_HERO>;
        if (parsed.eyebrow) setEyebrow(parsed.eyebrow);
        if (parsed.headline) setHeadline(parsed.headline);
        if (parsed.description) setDescription(parsed.description);
      } catch {
        // ignore malformed data
      }
    }

    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) as 'light' | 'dark' | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify({ eyebrow, headline, description }));
  }, [eyebrow, headline, description]);

  const updateField = (field: HeroField, value: string) => {
    if (field === 'eyebrow') setEyebrow(value);
    if (field === 'headline') setHeadline(value);
    if (field === 'description') setDescription(value);
  };

  const renderEditableField = (
    field: HeroField,
    label: string,
    value: string,
    inputType: 'input' | 'textarea'
  ) => {
    const isEditing = editing === field;
    return (
      <div className={`hero-field hero-field-${field}`}>
        <div className="hero-field-meta">
          <button
            type="button"
            className="hero-edit-button"
            aria-label={`Edit ${label}`}
            onClick={() => setEditing(isEditing ? null : field)}
          >
            ✎
          </button>
        </div>

        {isEditing ? (
          inputType === 'input' ? (
            <input
              className="hero-input"
              value={value}
              onChange={(event) => updateField(field, event.target.value)}
              onBlur={() => setEditing(null)}
              autoFocus
            />
          ) : (
            <textarea
              className="hero-textarea"
              value={value}
              onChange={(event) => updateField(field, event.target.value)}
              onBlur={() => setEditing(null)}
              rows={3}
              autoFocus
            />
          )
        ) : field === 'eyebrow' ? (
          <p className="eyebrow">{value}</p>
        ) : field === 'headline' ? (
          <h1>{value}</h1>
        ) : (
          <p className="hero-copy">{value}</p>
        )}
      </div>
    );
  };

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div className="hero-panel-controls">
          <button
            type="button"
            className="theme-toggle-switch"
            onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <span className={`theme-toggle-thumb ${theme === 'dark' ? 'active' : ''}`} />
          </button>
        </div>

        <div className="hero-panel-content">
          {renderEditableField('eyebrow', 'Eyebrow', eyebrow, 'input')}
          {renderEditableField('headline', 'Headline', headline, 'input')}
          {renderEditableField('description', 'Description', description, 'textarea')}
        </div>
      </section>
      <Board />
    </main>
  );
}
