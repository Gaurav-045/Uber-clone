import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide';

const CaptainRiding = () => {

    const [finish, setFinish] = useState(false);

    const finishRef = useRef();

    useEffect(() => {
        if (finish === true) {
            finishRef.current.classList.remove('translate-y-full');
        }
        else {
            finishRef.current.classList.add('translate-y-full');
        }
    })

    return (
        <div className='h-screen w-full'>
            <img className='w-15 absolute left-5 top-5 rounded-xl' src="https://cdn.mos.cms.futurecdn.net/5ij5qdSHFzJ2piPRuoTL5F.jpg" alt="" />
            <Link to='/captain-logout' className='fixed right-4 top-4 px-4 py-3 rounded-full bg-white'><i className="font-bold text-2xl ri-logout-box-r-line"></i>
            </Link>
            <div className='h-4/5'>
                <img className='h-full object-cover w-full' src="https://cdn.theatlantic.com/thumbor/BlEOtTo9L9mjMLuyCcjG3xYr4qE=/0x48:1231x740/960x540/media/img/mt/2017/04/IMG_7105/original.png" alt="" />
            </div>

            <div onClick={()=>{
                setFinish(true);
            }}
                className='h-1/5 bg-amber-200 w-full'>
                <div className='flex justify-center p-2'>
                    <i className="text-2xl font-semibold ri-arrow-up-wide-line"></i>
                </div>
                <div className='w-full flex items-center justify-between px-4'>

                    <div className='px-5'>
                        <h3 className='font-semibold text-xl'>4.5 KM away</h3>
                    </div>
                    <div className='px-5'>
                        <button className='px-9 py-2 bg-green-500 text-white rounded-xl'>
                            Complete
                        </button>
                    </div>
                </div>
            </div>
            <div ref={finishRef} className='z-4 p-3 h-full bg-white w-full fixed bottom-0 translate-y-full'>
               <FinishRide/>
            </div>
        </div>
    )
}

export default CaptainRiding
