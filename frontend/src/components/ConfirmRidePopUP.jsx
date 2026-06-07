import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmRidePopUP = (props) => {

    const navigate = useNavigate();

    const [otp, setOtp] = useState('');
    const [ride, setRide] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
            params: {
                rideId: props.rideData._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            setRide(response.data);
            console.log("In confirm ride : ",response.data);
            
            navigate('/captain-riding',{state:{ride:response.data}});
        }

        setOtp('');
    };


    return (
        <div className='p-4'>
            <div className='pb-2'
                onClick={() => {
                    props.setConfirmRidePopUp(false);
                }}
                className='flex justify-center'>
                <h3>
                    <i className="text-3xl ri-arrow-down-wide-line"></i>
                </h3>
            </div>
            <h2 className='mb-4 p-3 text-xl font-bold'>Confirm to Start  </h2>
            <div className='flex items-center justify-between  mb-3 bg-yellow-200 p-2 rounded-xl'>
                <div className='flex gap-3 items-center'>
                    <img className='w-15 rounded-full h-15 object-center object-cover' src="https://img.magnific.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                    <p className='text-lg'>{props.rideData?.user.name.firstname} {props.rideData?.user.name.lastname}</p>
                </div>
                <div className='text-right'>
                    <h2 className='font-semibold text-xl'>{props.rideData?.distance} Km</h2>
                </div>
            </div>
            <div className='p-2'>
                <div className='p-2 flex items-center gap-3 border-b border-gray-400'>
                    <i className="ri-map-pin-fill"></i>
                    <div>
                        <h3 className='font-semibold'>562/11-A</h3>
                        <p>{props.rideData?.pickUp}</p>
                    </div>
                </div>
                <div className='p-2 flex items-center gap-3 border-b border-gray-400'>
                    <i className=" ri-map-pin-line"></i>
                    <div>
                        <h3 className='font-semibold '>363/10-A</h3>
                        <p>{props.rideData?.destination}</p>
                    </div>
                </div>
                <div className='p-2 flex items-center gap-3'>
                    <i className="ri-money-rupee-circle-fill"></i>
                    <div>
                        <h3 className='font-semibold '>{props.rideData?.fare}</h3>
                        <p>Cash Cash</p>
                    </div>
                </div>
                <form onSubmit={(e) => {
                    submitHandler(e);
                }}>

                    <input onChange={(e) => {
                        setOtp(e.target.value);
                    }} className='w-full bg-[#eee] p-2 mt-5 mb-3 font-mono' type="text" placeholder='Enter OTP' />

                    <button
                        type='submit'
                        className='w-full py-2 rounded-xl my-2 bg-green-300'>
                        Confirm
                    </button>

                    <button
                        type='button'
                        onClick={() => props.setConfirmRidePopUp(false)}
                        className='w-full p-2 rounded-xl bg-gray-400'>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ConfirmRidePopUP
