import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BookProvider } from "./context/BookContext.tsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/authContext.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<p>The app encountered an unexpected error. Please refresh the page.</p>}>
      <BrowserRouter>
        <AuthProvider>
          <BookProvider>
            <App />
          </BookProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
