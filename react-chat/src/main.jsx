import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import {BrowserRouter as Router} from "react-router-dom";
import {AppProvider} from "./AppContext.jsx";


    console.log(window.location.origin)
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <AppProvider>
                <App/>
            </AppProvider>
        </Router>
    </StrictMode>,
)
