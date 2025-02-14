import { createRoot } from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/AppContext';
import { BrowserRouter, Router } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AppProvider>

            <App />

        </AppProvider>

    </BrowserRouter>

);