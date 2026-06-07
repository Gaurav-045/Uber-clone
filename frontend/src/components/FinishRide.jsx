import axios from 'axios'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const FinishRide = (props) => {

    const navigate = useNavigate();

    async function Finish() {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/finish`,{
            rideId:props.ride._id
        },{
            headers:`Bearer ${localStorage.getItem('token')}`
        });

        if(response.status === 200){
            console.log('ride finished');
            navigate('/captain-home');
        }

    }

    return (
        <div>
            <div className='p-4'>
                <div className='pb-2'
                    onClick={() => {
                        
                    }}
                    className='flex justify-center'>
                    <h3>
                        <i className="text-3xl ri-arrow-down-wide-line"></i>
                    </h3>
                </div>
                <h2 className='mb-4 p-3 text-xl font-bold'>Finish this Ride</h2>
                <div className='flex items-center justify-between  mb-3 bg-yellow-200 p-2 rounded-xl'>
                    <div className='flex gap-3 items-center'>
                        <img className='w-15 rounded-full h-15 object-center object-cover' src="https://img.magnific.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                        <p className='text-lg'>{props.ride?.user.name.firstname} {props.ride?.user.name.lastname} </p>
                    </div>
                    <div className='text-right'>
                        <h2 className='font-semibold text-xl'>{props.ride?.distance} KM</h2>
                    </div>
                </div>
                <div className='p-2'>
                    <div className='p-2 flex items-center gap-3 border-b border-gray-400'>
                        <i className="ri-map-pin-fill"></i>
                        <div>
                            <h3 className='font-semibold'>562/11-A</h3>
                            <p>{props.ride?.pickUp}</p>
                        </div>
                    </div>
                    <div className='p-2 flex items-center gap-3 border-b border-gray-400'>
                        <i className=" ri-map-pin-line"></i>
                        <div>
                            <h3 className='font-semibold '>363/10-A</h3>
                            <p>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='p-2 flex items-center gap-3'>
                        <i className="ri-money-rupee-circle-fill"></i>
                        <div>
                            <h3 className='font-semibold '>{props.ride?.fare}</h3>
                            <p>Cash Cash</p>
                        </div>
                    </div>
                    <div className='p-2 mt-3'>
                        <button
                            onClick={() =>{
                                Finish();
                            }}
                            className='w-full  py-2 flex justify-center rounded-xl bg-green-300'>Finish Ride</button>
                    </div>
                    <div className='mt-3 p-2'>
                        <p className='text-gray-400'>Click Finish ride button if the payment has done</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FinishRide
