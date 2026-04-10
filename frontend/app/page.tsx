import Board from '../components/Board';

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Kanban board</p>
          <h1>Single-board project manager</h1>
          <p className="hero-copy">
            Keep work moving in one clean board with five editable columns, draggable cards, and fast card creation.
          </p>
        </div>
      </section>
      <Board />
    </main>
  );
}
