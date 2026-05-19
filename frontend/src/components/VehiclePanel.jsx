import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div >
            <div
                onClick={() => {
                    props.setVpflag(false);
                }}
                className='flex justify-center'>
                <h3>
                    <i className="text-3xl ri-arrow-down-wide-line"></i>
                </h3>
            </div>
            <h2 className='mb-4 p-3 text-xl font-bold'>Choose a Vehicle </h2>

            <div
                onClick={() => {
                    props.setConflag(true)
                }}
                className='p-2 flex bg-gray-100 justify-between items-center active:border-2 active:border-black rounded-3xl mb-2'>
                <img className='w-20' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n" alt="" />
                <div className='-ml-5'>
                    <h4 className='font-semibold text-xl'>UberGo <span className='ml-1 text-sm'><i className="ri-user-fill"></i>4</span></h4>
                    <h5>3 mins away</h5>
                    <p className='text-gray-600 text-base'>Affortable car ride</p>
                </div>
                <h2 className='text-xl font-semibold'>193.86</h2>
            </div>

            <div
                onClick={() => {
                    props.setConflag(true)
                }}
                className='p-2 flex justify-between items-center active:border-2 active:border-black bg-gray-100 rounded-3xl mb-2'>
                <img className='w-14 pl-3' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n" alt="" />
                <div className='-ml-5'>
                    <h4 className='font-semibold text-xl'>Moto <span className='ml-1 text-sm'><i className="ri-user-fill"></i>1</span></h4>
                    <h5>5 mins away</h5>
                    <p className='text-gray-600 text-base'>Affortable bike ride</p>
                </div>
                <h2 className='text-xl font-semibold'>65.12</h2>
            </div>

            <div
                onClick={() => {
                    props.setConflag(true)
                }}
                className='p-2 flex bg-gray-100 justify-between items-center active:border-2 active:border-black rounded-3xl mb-2'>
                <img className='w-18' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mYzEwMWZmOC04MWExLTQ2YzMtOTk1YS02N2I0YmJkMmYyYmYuanBn" alt="" />
                <div className='-ml-5'>
                    <h4 className='font-semibold text-xl'>AutoGo <span className='ml-1 text-sm'><i className="ri-user-fill"></i>3</span></h4>
                    <h5>1 mins away</h5>
                    <p className='text-gray-600 text-base'>Affortable auto ride</p>
                </div>
                <h2 className='text-xl font-semibold'>121.83</h2>
            </div>
        </div>
    )
}

export default VehiclePanel
