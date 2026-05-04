import React from 'react'
import { Routes , Route} from 'react-router-dom'

import Home from './pages/home'
import UserLogin from './pages/userLogin'
import Signup from './pages/userSignUp'
import CaptainLogin from './pages/captainLogin'
import Captainsignup from './pages/captainSignUp'

const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/captain-login' element ={<CaptainLogin/>}  />
        <Route path='/captain-signup' element ={<Captainsignup/>}  />

      </Routes>
    </div>
  )
}

export default App
