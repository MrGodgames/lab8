import { Routes, Route } from 'react-router-dom'
import './App.css'
import Tech from './Gordienko.jsx'
import Odezda from './Bogachev.jsx'

function Home() {
  return (
    <div>
      <h1>выбрать базу данных</h1>
      <button><a href="/Odezda">Богачев</a></button>
      <button><a href="/Tech">Гордиенко</a></button>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Tech" element={<Tech />} />
      <Route path="/Odezda" element={<Odezda />} />
    </Routes>
  )
}

export default App
