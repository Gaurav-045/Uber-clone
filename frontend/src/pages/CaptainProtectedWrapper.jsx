import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';


const CaptainProtectedWrapper = ({ children }) => {

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const { captain, setCaptain } = useContext(CaptainDataContext);

    const [isloading, setIsloading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
        }
    }, [token]);

    axios.get(`${import.meta.env.VITE_BASE_URL}/api/captain/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            const data = response.data;
            const captain = data.captain;
            setCaptain(captain);
            setIsloading(false);
        }
    }).catch(err => {
        localStorage.removeItem('token');
        console.log(err);
        navigate('/captain-login');
    })

    if (isloading) {
        return (
            <div>
                ....loading....
            </div>
        )
    }
    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectedWrapper
