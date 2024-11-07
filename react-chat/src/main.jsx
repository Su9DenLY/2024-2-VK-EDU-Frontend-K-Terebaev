import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import {HashRouter} from "react-router-dom";
import {AppProvider} from "./AppContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HashRouter>
            <AppProvider>
                <App/>
            </AppProvider>
        </HashRouter>
    </StrictMode>,
)
