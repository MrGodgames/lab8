import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Bogachev.css'

function Odezda() {
  return (

      <div className='odezdaMain'>
        <a href="/" className='backButton'>назад</a>
        <div className='mainContent'>
          <div className='head'><h1>Магазин одежды</h1></div>
          <div className='table'>Выберете табличку</div>
        </div>
      </div>
  )
}

export default Odezda
