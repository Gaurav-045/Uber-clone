import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';

import { UserDataContext } from '../context/UserContext';

const UserProtectedWrapper = ({ children }) => {

    const navigate = useNavigate();

    const {user,setUser} = useContext(UserDataContext);

    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/profile`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((response) =>{
        const data = response.data;
        setUser(data.user);

    }).catch(err =>{
        console.log(err);
        navigate('/login');
        localStorage.removeItem('token');
    })

    return children;
}

export default UserProtectedWrapper