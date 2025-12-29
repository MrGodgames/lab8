import { Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import Tech from './Gordienko.jsx'
import Odezda from './Bogachev.jsx'
import TechTovar from './techtables/techtovar';
import TechZakaz from './techtables/techzakaz';
import TechSotrud from './techtables/techsotrud';

function Home() {
  return (
    <div>
      <h1>выбрать базу данных</h1>
      <button><NavLink to="/Odezda">Богачев</NavLink></button>
      <button><NavLink to="/Tech">Гордиенко</NavLink></button>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/techtovar" element={<TechTovar />} />
      <Route path="/techzakaz" element={<TechZakaz />} />
      <Route path="/techsotrud" element={<TechSotrud />} />
      <Route path="/" element={<Home />} />
      <Route path="/Tech" element={<Tech />} />
      <Route path="/Odezda" element={<Odezda />} />
    </Routes>
  )
}

export default App
