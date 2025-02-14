import { createRoot } from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/AppContext';
import { Router } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(
    <AppProvider>
        <Router>
            <App />
        </Router>
    </AppProvider>
);