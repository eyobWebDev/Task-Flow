import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
import { useContext } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [email, setEmail] = useState()

  return (
    <>
      <h1>Home</h1>
    </>
  )
}

export default App
