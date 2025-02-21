import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'
import Login from "./views/Login"

function App() {
  const [backendData, setBackendData]= useState([{}])
  useEffect(() =>{
    fetch("/login")
    .then(
      response => response.json())
    .then(
      data =>{
        setBackendData (data)
      }
    )
  }, [])
  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
