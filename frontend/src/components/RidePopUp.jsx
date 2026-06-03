import React from 'react'

const RidePopUp = (props) => {
    return (
        <div className='p-4'>
            <div className='pb-2'
                onClick={() => {
                    props.setRidePopUp(false);
                }}
                className='flex justify-center'>
                <h3>
                    <i className="text-3xl ri-arrow-down-wide-line"></i>
                </h3>
            </div>
            <h2 className='mb-4 p-3 text-xl font-bold'>New Ride Available ! </h2>
            <div className='flex items-center justify-between  mb-3 bg-yellow-200 p-2 rounded-xl'>
                <div className='flex gap-3 items-center'>
                    <img className='w-15 rounded-full h-15 object-center object-cover' src="https://img.magnific.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                    <p className='text-lg'>{props.rideData?.user.name.firstname} {props.rideData?.user.name.lastname}</p>
                </div>
                <div className='text-right pr-2'>
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
                <div className='p-2'>
                    <button onClick={() => {
                        props.setConfirmRidePopUp(true);
                        props.setRidePopUp(false);
                    }}
                        className='w-full p-1 rounded-xl bg-green-300'>Accept</button>
                </div>
                <div className='p-2'>
                    <button onClick={() => {
                        props.setRidePopUp(false);
                    }}
                        className='w-full p-1 rounded-xl bg-gray-400'>Ignore</button>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp
