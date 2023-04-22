import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ThemeWrapper from './App';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root');
if (!root) {
    throw new Error('Could not find root element');
}

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <ThemeWrapper />
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
