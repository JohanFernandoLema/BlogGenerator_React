import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDq9faIyZLWw1FuUNGuenKzPpJo3hUQF6M',
  authDomain: 'react-blog-ae75e.firebaseapp.com',
  projectId: 'react-blog-ae75e',
  storageBucket: 'react-blog-ae75e.appspot.com',
  messagingSenderId: '85680699538',
  appId: '1:85680699538:web:1e119f2b08f506dd230e4b',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
