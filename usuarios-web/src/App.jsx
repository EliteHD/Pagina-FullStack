import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-slate-500 rounded-full shadow-xl '>
        <h1 className='text-2xl text-center text-white'>Hola Mundo</h1>
      </div>

    </>
  )
}

export default App
