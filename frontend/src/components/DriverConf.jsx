import React from 'react'

const DriverConf = (props) => {
  return (
     <div className='p-2'>
      <div className='pb-2'
                className='flex justify-center'>
                <h3 onClick={()=>{
                    props.setDriveFlag(false);
                }}>
                    <i className="text-3xl ri-arrow-down-wide-line"></i>
                </h3>
            </div>
            <h2 className='mb-4 p-3 text-xl font-bold'>Your driver </h2>
        <div className='flex items-center justify-between'>
            <img className='w-25' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n" alt="" />
            <div className='text-right'>
                <h4 className='text-lg capitalize'>{props.rideData?.captain.name}</h4>
                <h2 className='font-semibold text-xl'>{props.rideData?.captain.vehicle.licensePlate}</h2>
                <p className='text-gray-600'>{props.rideData?.captain.vehicle.model}</p>
            </div>
        </div>
        <div className='flex items-center justify-center p-3 my-2 bg-gray-300 rounded-3xl'>
            <h4 className='font-semibold text-lg'>OTP : {props.rideData?.otp}</h4>
        </div>
        <div>
            <div className='p-2 flex items-center gap-3 border-b border-gray-400'>
                <i className="ri-map-pin-fill"></i>
                <div>
                    <h3 className='font-semibold'>363/10-A</h3>
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
            
        </div>
    </div>
  )
}

export default DriverConf
