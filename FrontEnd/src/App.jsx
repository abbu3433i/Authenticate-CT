import React from 'react'
import Signup from './Component/Signup'
import { Routes , Route } from 'react-router-dom'
import Login from './Component/Login'

function App() {
  return (
    <Routes> {/* ----------first set thin in index jsx file------------*/}
      <Route path='/' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
    
  )
}

export default App