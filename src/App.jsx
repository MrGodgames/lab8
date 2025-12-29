import { Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import Tech from './Gordienko.jsx'
import Odezda from './Bogachev.jsx'
import TechTovar from './techtables/techtovar';
import TechZakaz from './techtables/techzakaz';
import TechSotrud from './techtables/techsotrud';
import TechPostavshik from './techtables/techpostavshik';
import OdezdaTovar from './odezdatables/odezdatovar';
import OdezdaZakaz from './odezdatables/odezdazakaz';
import OdezdaKlient from './odezdatables/odezdaklient';
import OdezdaPostavshik from './odezdatables/odezdapostavshik';

function Home() {
  return (
    <div className="home">
      <h1 className="home-title">Выбрать базу данных</h1>
      <div className="home-actions">
        <button><NavLink to="/Odezda">Богачев</NavLink></button>
        <button><NavLink to="/Tech">Гордиенко</NavLink></button>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/techtovar" element={<TechTovar />} />
      <Route path="/techzakaz" element={<TechZakaz />} />
      <Route path="/techsotrud" element={<TechSotrud />} />
      <Route path="/techpostavshik" element={<TechPostavshik />} />
      <Route path="/odezdatovar" element={<OdezdaTovar />} />
      <Route path="/odezdazakaz" element={<OdezdaZakaz />} />
      <Route path="/odezdaklient" element={<OdezdaKlient />} />
      <Route path="/odezdapostavshik" element={<OdezdaPostavshik />} />
      <Route path="/" element={<Home />} />
      <Route path="/Tech" element={<Tech />} />
      <Route path="/Odezda" element={<Odezda />} />
    </Routes>
  )
}

export default App
