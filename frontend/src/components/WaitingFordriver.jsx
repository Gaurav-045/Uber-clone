import React from 'react'

const WaitingFordriver = (props) => {
  return (
    <div className='p-2'>
      <div className='pb-2'
                className='flex justify-center'>
                <h3 onClick={()=>{
                    props.setCapFound(false);
                }}>
                    <i className="text-3xl ri-arrow-down-wide-line"></i>
                </h3>
            </div>
            <h2 className='mb-4 p-3 text-xl font-bold'>Waiting for driver </h2>
        <div className='flex justify-center'>
            <img className='w-40' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n" alt="" />
        </div>

        <div>
            <div className='p-2 flex items-center gap-3 border-b border-gray-400'>
                <i className="ri-map-pin-fill"></i>
                <div>
                    <h3 className='font-semibold'>562/11-A</h3>
                    <p>kasarsai lake, pune</p>
                </div>
            </div>
            <div className='p-2 flex items-center gap-3 border-b border-gray-400'>
                <i className=" ri-map-pin-line"></i>
                <div>
                    <h3 className='font-semibold '>363/10-A</h3>
                    <p>I2IT engineering college, pune</p>
                </div>
            </div>
            <div className='p-2 flex items-center gap-3'>
                <i className="ri-money-rupee-circle-fill"></i>
                <div>
                    <h3 className='font-semibold '>193.20</h3>
                    <p>Cash Cash</p>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default WaitingFordriver
