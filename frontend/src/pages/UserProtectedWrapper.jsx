import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

import { UserDataContext } from '../context/UserContext';

const UserProtectedWrapper = ({ children }) => {

    const navigate = useNavigate();

    const { user, setUser } = useContext(UserDataContext);

    const token = localStorage.getItem('token');

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                const data = response.data;
                setUser(data.user);
                setIsLoading(false);
            }
        }).catch(err => {
            console.log(err);
            localStorage.removeItem('token');
            setIsLoading(false);
            navigate('/login');
        })
    }, [token, navigate, setUser]);

    if (isLoading) {
        return (
            <div>....loading....</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectedWrapper