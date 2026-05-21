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
                <h4 className='text-lg'>Gaurav Kakade</h4>
                <h2 className='font-semibold text-xl'>MH 16 PQ 9314</h2>
                <p className='text-gray-600'>Maruti Suzuki Swift</p>
            </div>
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

export default DriverConf
