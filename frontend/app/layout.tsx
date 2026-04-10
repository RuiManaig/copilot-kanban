import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Copilot Kanban',
  description: 'Minimal single-board Kanban project manager',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
