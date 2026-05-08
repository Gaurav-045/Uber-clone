import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const userLogin = () => {

    const navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [userData,setUserData] = useState({});

    const submitHandler = async(e)=>{
        e.preventDefault();
        console.log("prevent works");

        const userLogin = ({
            email:email,
            password:password
        })

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`,userLogin);

        if(response.status === 201){
            const data = response.data;
            
            localStorage.setItem('token',data.token);

            console.log(localStorage.getItem('token'));

            navigate('/home');
        }

        setEmail('');
        setPassword('');
    }

  return (
    <div className='py-4 px-6 flex flex-col justify-between md:ml-[30vw] md:mr-[30vw] md:gap-4'>
        <img className='w-24 mt-4 mb-6' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1280px-Uber_logo_2018.svg.png" alt="" />
        
        <form onSubmit={(e) =>{
            submitHandler(e);
        }}>

            <h3 className='m-2'>Enter Email :</h3>
            <input 
                value={email}
                onChange={(e)=>{
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
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                required
                className='bg-[#c7c3c3] py-2 px-4 m-2 w-full'
                type="text" 
                placeholder='enter password'
            />

            <button className='bg-[#0b0a09] text-white w-full p-2 rounded-lg m-2'>Login</button>
        <p className='p-3'>New here ? <Link to='/signup' className='text-blue-600'> Create new account</Link></p>

        </form>

        

        <div className='px-1 mt-4 flex flex-col'>
            <Link to='/captain-login' className='bg-[#038f21] text-white w-full 
            p-2 rounded-lg m-2 flex justify-center items-center'
            >Login as Captain
            </Link>
        </div>

    </div>
  )
}

export default userLogin
