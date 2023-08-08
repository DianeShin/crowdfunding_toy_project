import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './general/App';
import AuthProvider from "./general/ContextElem";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <AuthProvider>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@700&family=Rokkitt:wght@300&display=swap');
            </style>
            <App />
        </AuthProvider>
);
