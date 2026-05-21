import React from 'react'

const CaptainInfo = () => {
    return (
        <div>
            <div className='flex  items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <img className='w-15 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGEu6oVvG-nezGfJ9GBSZQ-WrUc1k2E5ZKRg&s" alt="" />
                    <p className='text-lg'>Gaurav Kakade</p>
                </div>
                <div className='text-right flex flex-col gap-2'>
                    <h2 className='font-bold text-xl'>$ 293.20</h2>
                    <p className='text-gray-600'>Earned</p>
                </div>
            </div>
            <div className='flex justify-center gap-15 p-3 bg-gray-100 rounded-2xl mt-5'>
                <div>
                    <i className="text-3xl ri-time-line"></i>
                    <h4>10.2</h4>
                    <h5>hours</h5>
                </div>
                <div>
                    <i className="text-3xl ri-dashboard-2-line"></i>
                    <h4>10.2</h4>
                    <h5>hours</h5>
                </div>
                <div>
                    <i className="text-3xl ri-booklet-line"></i>
                    <h4>10.2</h4>
                    <h5>hours</h5>
                </div>
            </div>

        </div>
    )
}

export default CaptainInfo
