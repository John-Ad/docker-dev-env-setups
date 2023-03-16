import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Categories } from './views/Categories/categories'
import { Items } from './views/Items/items'

const App = () => {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/Items" element={<Items />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}


export default App
