import { fireEvent, render, screen } from '@testing-library/react';
import Board from '../components/Board';

describe('Board component', () => {
  it('renders all initial columns', () => {
    render(<Board />);
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('Blocked')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('creates a new card inside a column', () => {
    render(<Board />);

    const titleInputs = screen.getAllByPlaceholderText('Card title');
    const detailInputs = screen.getAllByPlaceholderText('Details');
    const addButtons = screen.getAllByRole('button', { name: /Add card/i });

    fireEvent.change(titleInputs[0], { target: { value: 'New task' } });
    fireEvent.change(detailInputs[0], { target: { value: 'Created by test' } });
    fireEvent.click(addButtons[0]);

    expect(screen.getByText('New task')).toBeInTheDocument();
    expect(screen.getByText('Created by test')).toBeInTheDocument();
  });
});
