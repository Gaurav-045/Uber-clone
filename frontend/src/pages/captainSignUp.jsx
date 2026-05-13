import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const captainSignUp = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [color, setColor] = useState('');
  const [capacity, setCapacity] = useState('');
  const [model, setModel] = useState('');
  const [licensePlate, setLicenseplate] = useState('');
  const [vehicleType, setType] = useState('');


  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      name: name,
      email: email,
      password: password,
      vehicle: {
        color,
        capacity,
        model,
        licensePlate,
        vehicleType
      }
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/captain/register`,
        captainData
      );

      console.log(response);

      if ((await response).status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        setCapacity(data.captain);
        navigate('/captain-home');
      }

    } catch (error) {
      console.log(error.response.data);
    }


    setEmail('');
    setPassword('');
    setName('');
    setColor('');
    setModel('');
    setCapacity('');
    setLicenseplate('');
    setType('');



  }

  return (
    <div>
      <div className='py-4 px-6 flex flex-col justify-between md:ml-[30vw] md:mr-[30vw] md:gap-4'>
        <img className='w-16 mt-4 mb-6' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHjUb-erX5J8t-bQ5C_reaUNPuUrv8_pygAQ&s" alt="" />

        <form onSubmit={(e) => {
          submitHandler(e);
        }}>

          <div>
            <h3 className='ml-5'> name :</h3>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              required
              className='bg-[#c7c3c3] py-2 px-4 m-2 w-full'
              type="text"
              placeholder='first name'
            />
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
          <b className='ml-3'>Enter Vehicle Info :</b>
          <div className='flex gap-4'>
            <div>
              <h3 className='ml-5'>Color :</h3>
              <input
                value={color}
                onChange={(e) => {
                  setColor(e.target.value)
                }}
                required
                className='bg-[#c7c3c3] py-2 px-4 m-2 w-full'
                type="text"
                placeholder='color'
              />
            </div>
            <div>
              <h3 className='ml-5'>Capacity :</h3>
              <input
                value={capacity}
                onChange={(e) => {
                  setCapacity(e.target.value)
                }}
                required
                className='bg-[#c7c3c3] py-2 px-4 m-2 w-full'
                type="number"
                placeholder='capacity'
              />
            </div>
          </div>
          <div className='flex gap-4'>
            <div>
              <h3 className='ml-5'>Model :</h3>
              <input
                value={model}
                onChange={(e) => {
                  setModel(e.target.value)
                }}
                required
                className='bg-[#c7c3c3] py-2 px-4 m-2 w-full'
                type="text"
                placeholder='model'
              />
            </div>
            <div>
              <h3 className='ml-5'>license Plate :</h3>
              <input
                value={licensePlate}
                onChange={(e) => {
                  setLicenseplate(e.target.value)
                }}
                required
                className='bg-[#c7c3c3] py-2 px-4 m-2 w-full'
                type="text"
                placeholder='plate number'
              />
            </div>
          </div>
          <div>
            <h3 className='ml-5'>Vehicle type (car,auto,bike) :</h3>
            <input
              value={vehicleType}
              onChange={(e) => {
                setType(e.target.value)
              }}
              required
              className='bg-[#c7c3c3] py-2 px-4 m-2 w-full'
              type="text"
              placeholder='vehicle type'
            />
          </div>


          <button className='bg-[#0b0a09] text-white w-full p-2 rounded-lg m-2'>Create Account</button>
          <p className='p-3'>Already have account ?  <Link to='/captain-login' className='text-blue-600'>Login</Link></p>

        </form>

      </div>
    </div>
  )
}

export default captainSignUp
