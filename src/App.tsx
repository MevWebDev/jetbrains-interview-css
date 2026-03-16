import { TraceDemoComponent } from "./components/TraceDemoComponent";
import "./App.css";

export function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>WebStorm CSS Tracing Demo</h1>
        <p className="app-subtitle">
          Inspect the element below to trace its styles.
        </p>
      </header>

      <main className="demo-main">
        <TraceDemoComponent />
      </main>
      
      <div className="instructions">
        <ul>
          <li><strong>Background color:</strong> from media query</li>
          <li><strong>Color:</strong> from CSS variable</li>
          <li><strong>Padding:</strong> from cascade</li>
          <li><strong>Font size:</strong> overridden via specificity</li>
          <li><strong>Cursor:</strong> from pseudo-class hover</li>
        </ul>
      </div>
    </div>
  );
}
