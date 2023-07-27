import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NavigationBar } from './components/navbar/navbar'
import { LoginPage } from './pages/login/login'
import { SignUpPage } from './pages/signup/signup'

function App() {

  return (

    <BrowserRouter>

      <NavigationBar />

      <div className="App">
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
