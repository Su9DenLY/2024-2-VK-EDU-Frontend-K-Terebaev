import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import {AppProvider} from "./AppContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AppProvider>
            <App/>
        </AppProvider>
    </StrictMode>,
)
