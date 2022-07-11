import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import{ About } from "./components/About";
import NoteState from './context/notes/NoteState'
import React, { useState } from 'react'


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./components/Alert";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";

function App() {

  const [mode, setMode] = useState("light")

  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
        setAlert(null)
      }, 1500);
    }
    
    const toggleMode = () => {

      if (mode === "light") {
        setMode("dark")
        document.body.style.backgroundColor = "black"
        document.body.style.color = "white"
        showAlert("Dark Mode Enabled", "success")
      } else {
        setMode("light");
        document.body.style.color = "black"

        document.body.style.backgroundColor = "white"
        showAlert("Light Mode Enabled", "success")
    }
  }
    
    return (
      <>
    <NoteState>
      <Router>
        <Navbar  mode={mode} toggleMode={toggleMode} />
        
      <Alert alert={alert} />
        <div className="container">

        <Routes>
          <Route exact path="/" element={<Home  showAlert={showAlert} mode = {mode} /> }  />
          <Route exact path="/about" element={<About mode={mode}/>}/>
          <Route exact path="/login" element={<Login showAlert={showAlert} mode= {mode} /> }/>
          <Route exact path="/signup" element={<Signup showAlert={showAlert} mode = {mode} />}/>
        </Routes>
        </div>
      </Router>
      
    </NoteState>
    </>
  );
}

export default App;
