import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import RequestListPage from './routes/RequestListPage';
import RequestFormPage from './bricks/RequestForm';
import HomePage from './routes/HomePage';

import reportWebVitals from './reportWebVitals';
import { UserProvider } from './UserProvider';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<HomePage/>} />
            <Route path="requestList" element={<RequestListPage/>} />
            <Route path="requestForm" element={<RequestFormPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
