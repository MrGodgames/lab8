import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (

      <div>
       <div>
        <h1>выбрать базу данных</h1>
        <select>
          <option value="odezda">Богачев</option>
          <option value="tech">Гордиенко</option>
        </select>
       </div>
      </div>
  )
}

export default App
