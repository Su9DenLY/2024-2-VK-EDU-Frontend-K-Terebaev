import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import {BrowserRouter, HashRouter} from "react-router-dom";
import {AppProvider} from "./AppContext.jsx";

const Router = import.meta.env.MODE === 'development' ? BrowserRouter : HashRouter

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <AppProvider>
                <App/>
            </AppProvider>
        </Router>
    </StrictMode>,
)
