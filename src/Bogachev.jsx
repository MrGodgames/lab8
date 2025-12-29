import { NavLink } from 'react-router-dom'
import './Bogachev.css'

function Odezda() {
  return (

      <div className='odezdaMain'>
        <a href="/" className='backButton'>назад</a>
        <div className='mainContent'>
          <div className='head'><h1>Магазин одежды</h1></div>
          <div className='odezda-table'>Выберите табличку</div>
          <div className='odezda-tablelist'>
            <button><NavLink to="/odezdatovar">Товары</NavLink></button>
            <button><NavLink to="/odezdazakaz">Заказы</NavLink></button>
            <button><NavLink to="/odezdaklient">Клиенты</NavLink></button>
            <button><NavLink to="/odezdapostavshik">Поставщики</NavLink></button>
          </div>
        </div>
      </div>


  )
}
export default Odezda
