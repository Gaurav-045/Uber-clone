import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'


const Riding = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const{ride} = location.state || {};

    function toHome(){
        navigate('/home');
    }

    return (
        <div className='h-screen w-full'>
            <Link to='/home' className='fixed left-4 top-4 px-4 py-3 rounded-full bg-white'><i className="font-bold text-2xl ri-home-4-fill"></i>
            </Link>
            <div className='h-1/2'>
                <img className='h-full object-cover w-full' src="https://cdn.theatlantic.com/thumbor/BlEOtTo9L9mjMLuyCcjG3xYr4qE=/0x48:1231x740/960x540/media/img/mt/2017/04/IMG_7105/original.png" alt="" />
            </div>
            <div className='h-1/2 p-4 mb-4'>
                <div className='flex items-center justify-between'>
                    <img className='w-25' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n" alt="" />
                    <div className='text-right'>
                        <h4 className='text-lg'>{ride?.captain.name}</h4>
                        <h2 className='font-semibold text-xl'>{ride?.captain.vehicle.licensePlate}</h2>
                        <p className='text-gray-600'>{ride?.captain.vehicle.vehicleType}</p>
                    </div>
                </div>

                <div className='my-2'>
                    <div className='p-2 flex items-center gap-3 border-b border-gray-400'>
                        <i className=" ri-map-pin-line"></i>
                        <div>
                            <h3 className='font-semibold '>363/10-A</h3>
                            <p>{ride?.destination}</p>
                        </div>
                    </div>
                    <div className='p-2 flex items-center gap-3'>
                        <i className="ri-money-rupee-circle-fill"></i>
                        <div>
                            <h3 className='font-semibold '>193.20</h3>
                            <p>Cash Cash</p>
                        </div>
                    </div>
                    <button 
                    onClick={(toHome)}
                    className='mt-2 p-2 w-full bg-green-800 text-white rounded-xl'>Make a Payment</button>
                </div>
            </div>
        </div>
    )
}

export default Riding
