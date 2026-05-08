import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'


const userSignUp = () => {

  const navigate = useNavigate();

  const [firstname, setFname] = useState('');
  const [lastname, setLname] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({});

  const {user,setUser} = useContext(UserDataContext);

  const submitHandler = async(e) => {
    e.preventDefault();

    const newUser = ({
      name: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password
    })


    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`,newUser);
   
    if(response.status === 201){
      const data = response.data;

      setUser(data.user);
      
      localStorage.setItem("token",data.token);

      navigate('/home');

    }

    
    setEmail('');
    setPassword('');
    setFname('');
    setLname('');

  }

  return (
    <div>
      <div className='py-4 px-6 flex flex-col justify-between md:ml-[30vw] md:mr-[30vw] md:gap-4'>
        <img className='w-24 mt-4 mb-6' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1280px-Uber_logo_2018.svg.png" alt="" />

        <form onSubmit={(e) => {
          submitHandler(e);
        }}>

          <div className='flex gap-4 w-full'>
            <div className='w-1/2'>
              <h3 className='ml-5'>First name :</h3>
              <input
                value={firstname}
                onChange={(e) => {
                  setFname(e.target.value)
                }}
                required
                className='bg-[#c7c3c3] py-2 px-4 m-2 w-full'
                type="text"
                placeholder='first name'
              />
            </div>
            <div className='w-1/2'>
              <h3 className='ml-5'>Last name: :</h3>
              <input
                value={lastname}
                onChange={(e) => {
                  setLname(e.target.value)
                }}
                required
                className='bg-[#c7c3c3] py-2 px-4 m-2 w-full'
                type="text"
                placeholder='last name'
              />
            </div>
          </div>

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

          <button className='bg-[#0b0a09] text-white w-full p-2 rounded-lg m-2'>Create Account</button>
          <p className='p-3'>Already have account ?  <Link to='/login' className='text-blue-600'>Login</Link></p>

        </form>

      </div>
    </div>
  )
}

export default userSignUp
