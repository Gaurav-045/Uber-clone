import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
    return (
        <div className='w-full'>
            <div className='bg-cover md:bg-[url("https://thumbs.dreamstime.com/b/watercolor-painting-traffic-light-urban-cityscape-watercolor-painting-traffic-light-urban-cityscape-suitable-392758864.jpg")] bg-center bg-[url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREMpZeZCjJeBXkYpC0YiY0DrWZQgvZXug21g&s")] w-full h-[85vh]'>
                <img className='w-32 p-6 rounded-lg' src="https://cdn.mos.cms.futurecdn.net/5ij5qdSHFzJ2piPRuoTL5F.jpg" alt="" />
            </div>
            <div className=' w-full h-20 bg-amber-50 flex flex-col justify-center items-center px-6'>
                    <h3 className='m-2'>Get Started with Uber</h3>
                    <Link to='/login' className='flex w-full justify-center items-center h-8 bg-red-900 text-white rounded-lg py-4 m-1'>Login</Link>
            </div>
        </div>

    )
}

export default Start
