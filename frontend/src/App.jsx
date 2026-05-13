import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Start from './pages/Start'
import UserLogin from './pages/userLogin'
import Signup from './pages/userSignUp'
import CaptainLogin from './pages/captainLogin'
import Captainsignup from './pages/captainSignUp'
import Home from './pages/home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import Logout from './pages/Logout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'

const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<Captainsignup />} />
        <Route path='/captain-signup' element={<Captainsignup />} />

        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        } />

        <Route path='Logout' element={
          <UserProtectedWrapper>
            <Logout />
          </UserProtectedWrapper>
        } />

        <Route path='/captain-home' element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
        } />

      </Routes>
    </div>
  )
}

export default App
