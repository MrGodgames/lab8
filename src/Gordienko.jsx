import { NavLink } from 'react-router-dom'
import './App.css'
import './gordienko.css'
function Tech() {
  return (
      <div className='Techmain'>
        <NavLink className='back' to="/">назад</NavLink>
        <div className='header'>Магазин бытовой техники</div>
        <div className='tablelist'>
        <button><NavLink to="/techtovar">Товары</NavLink></button>
        <button><NavLink to="/techzakaz">Заказы</NavLink></button>
        <button><NavLink to="/techsotrud">Сотрудники</NavLink></button>
        </div>    
      </div>
  )
}

export default Tech
