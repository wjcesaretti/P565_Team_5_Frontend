import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/authContext';
import {UsersContextProvider } from './context/userContext'
import { CoursesContextProvider } from './context/courseContext';
 
import './firebase-config'; //setting up firebase

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <AuthContextProvider>
      <UsersContextProvider>
        <CoursesContextProvider>
              <App />
        </CoursesContextProvider>
      </UsersContextProvider>
    </AuthContextProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
