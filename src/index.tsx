import { App } from './App';
import './App.css';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

const container = document.getElementById("app")!;
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
