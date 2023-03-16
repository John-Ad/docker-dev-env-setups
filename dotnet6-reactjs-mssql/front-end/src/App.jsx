import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

const App = () => {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Categories" element={<About />} />
          <Route path="/Items" element={<Users />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}


export default App
