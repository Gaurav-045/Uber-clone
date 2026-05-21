import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainInfo from '../components/CaptainInfo'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUP from '../components/ConfirmRidePopUP'

const CaptainHome = () => {

  const [ridePopUp,setRidePopUp] = useState(true);
  const [confirmRidePopUp,setConfirmRidePopUp] = useState(false);


  const ridePopPanel = useRef();
  const confirmRidePanel = useRef();

  useEffect(()=>{
    if(ridePopUp === true){
      ridePopPanel.current.classList.remove('translate-y-full');
    }
    else{
      ridePopPanel.current.classList.add('translate-y-full');
    }
  })

    useEffect(()=>{
    if(confirmRidePopUp === true){
      confirmRidePanel.current.classList.remove('translate-y-full');
    }
    else{
      confirmRidePanel.current.classList.add('translate-y-full');
    }
  })


  return (
    <div className='h-screen w-full'>
      <img className='w-15 absolute left-5 top-5 rounded-xl' src="https://cdn.mos.cms.futurecdn.net/5ij5qdSHFzJ2piPRuoTL5F.jpg" alt="" />
      <Link to='/captain-logout' className='fixed right-4 top-4 px-4 py-3 rounded-full bg-white'><i className="font-bold text-2xl ri-logout-box-r-line"></i>
      </Link>
      <div className='h-3/5'>
        <img className='h-full object-cover w-full' src="https://cdn.theatlantic.com/thumbor/BlEOtTo9L9mjMLuyCcjG3xYr4qE=/0x48:1231x740/960x540/media/img/mt/2017/04/IMG_7105/original.png" alt="" />
      </div>

      <div className='h-2/5 p-4 mb-4 mt-3'>
        <CaptainInfo/>
      </div>
      <div ref={ridePopPanel} className='z-4 p-3 bg-white w-full fixed bottom-0 translate-y-full'>
            <RidePopUp setRidePopUp={setRidePopUp} setConfirmRidePopUp={setConfirmRidePopUp} />
      </div>
       <div ref={confirmRidePanel} className='z-4 p-3 h-full bg-white w-full fixed bottom-0 translate-y-full'>
            <ConfirmRidePopUP  setConfirmRidePopUp={setConfirmRidePopUp} />
      </div>
    </div>
  )
}

export default CaptainHome
