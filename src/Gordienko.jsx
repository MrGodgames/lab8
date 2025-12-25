import { useNavigate } from 'react-router-dom';
import './App.css'
import './gordienko.css'
function Tech() {
    const navigate = useNavigate();
  return (
      <div className='Techmain'>
        <a className='back' href="/">назад</a>
        <div className='header'>Магазин бытовой техники</div>
        <div className='tablelist'>
        <button onClick={() => (navigate('/techtovar'), console.log('кнопка нажата'))}>Товары</button>
        <button onClick={() => (navigate('/techzakaz'), console.log('кнопка нажата'))}>Заказы</button>
        <button onClick={() => (navigate('/techsotrud'), console.log('кнопка нажата'))}>Сотрудники</button>
        </div>    
      </div>
  )
}

export default Tech
