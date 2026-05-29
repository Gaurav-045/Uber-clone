import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



const captainLogin = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async(e) => {
        e.preventDefault();


        const CaptainData = ({
            email: email,
            password: password
        })

        try{
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/captain/login`,CaptainData);

            if (response.status === 201){
                const data = response.data;
                localStorage.setItem('token',data.token);
                navigate('/captain-home');
            }
        }catch(error){
            console.log(error);
        }

        setEmail('');
        setPassword('');
    }

    return (
        <div className='py-4 px-6 flex flex-col justify-between md:ml-[30vw] md:mr-[30vw] md:gap-4'>
            <img className='w-16 mt-4 mb-6' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHjUb-erX5J8t-bQ5C_reaUNPuUrv8_pygAQ&s" alt="" />

            <form onSubmit={(e) => {
                submitHandler(e);
            }}>

                <h3 className='m-2'>Enter Email :</h3>
                <input
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    required
                    className='bg-[#c7c3c3] py-2 px-4 m-2 w-full'
                    type="text"
                    placeholder='enter Email'
                />


                <h3 className='m-2'>Enter Password :</h3>
                <input
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    required
                    className='bg-[#c7c3c3] py-2 px-4 m-2 w-full'
                    type="text"
                    placeholder='enter password'
                />

                <button className='bg-[#0b0a09] text-white w-full p-2 rounded-lg m-2'>Login</button>
                <p className='p-3'>New here ? <Link to='/captain-signup' className='text-blue-600'> Register as a captain</Link></p>

            </form>



            <div className='px-1 mt-4 flex flex-col'>
                <Link to='/login' className='bg-[#9b0333] text-white w-full 
            p-2 rounded-lg m-2 flex justify-center items-center'
                >Login as User
                </Link>
            </div>

        </div>
    )
}

export default captainLogin
