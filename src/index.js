import { createRoot } from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";


const root = createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AppProvider>

            <App />

        </AppProvider>

    </BrowserRouter>

);