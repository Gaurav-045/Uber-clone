import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const captainSignUp = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    setUserData({
      name: {
        fname: fname,
        lname: lname
      },
      email: email,
      password: password
    })


    console.log(captainData);
    setEmail('');
    setPassword('');
    setFname('');
    setLname('');

  }

  return (
    <div>
      <div className='py-4 px-6 flex flex-col justify-between md:ml-[30vw] md:mr-[30vw] md:gap-4'>
        <img className='w-16 mt-4 mb-6' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHjUb-erX5J8t-bQ5C_reaUNPuUrv8_pygAQ&s" alt="" />

        <form onSubmit={(e) => {
          submitHandler(e);
        }}>

          <div className='flex gap-4'>
            <div>
              <h3 className='ml-5'>First name :</h3>
              <input
                value={fname}
                onChange={(e) => {
                  setFname(e.target.value)
                }}
                required
                className='bg-[#c7c3c3] py-2 px-4 m-2 w-full'
                type="text"
                placeholder='first name'
              />
            </div>
            <div>
              <h3 className='ml-5'>Last name: :</h3>
              <input
                value={lname}
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

          <button className='bg-[#0b0a09] text-white w-full p-2 rounded-lg m-2'>SignUp</button>
          <p className='p-3'>Already have account ?  <Link to='/captain-login' className='text-blue-600'>Login</Link></p>

        </form>

      </div>
    </div>
  )
}

export default captainSignUp
