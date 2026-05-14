import React from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {

        axios.get(`${import.meta.env.VITE_BASE_URL}/api/captain/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 201) {
                localStorage.removeItem('token');
                navigate('/captain-login');
            }
        }).catch(err => {
            console.log(err);
        });

    }, [token])

    return (
        <div>
            Captain logout
        </div>
    )
}

export default CaptainLogout
