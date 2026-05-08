import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Logout = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 201){
            localStorage.removeItem('token');
            navigate('/login')
        }
    })


  return (
    <div>
        Logout
    </div>
  )
}

export default Logout
