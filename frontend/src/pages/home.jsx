import React, { use, useEffect, useRef, useState } from 'react'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConformRide from '../components/ConformRide';

const Home = () => {

  const [pickup,setPickup] = useState('');
  const [destination,setDestination] = useState('');
  const [vpflag,setVpflag] = useState(false);
  const [conflag,setConflag]= useState(false);

  const panelRef = useRef();
  const panelRef2 = useRef();
  const vehiclePanelRef = useRef();
  const confirmPanelRef = useRef();

  const submitHandler = (e) =>{
    e.preventDefault();
  }

  const panelFun1 = ()=>{
    panelRef.current.style.height = '70%';
    panelRef2.current.classList.remove('hidden');
  }
  const panelFun2 = () =>{
    panelRef.current.style.height = '0%';
    panelRef2.current.classList.add('hidden');
  }

  useEffect(()=>{
    if (conflag === true){
      confirmPanelRef.current.classList.remove('translate-y-full');
    }
    else{
      confirmPanelRef.current.classList.add('translate-y-full');
    }
  },[conflag]);

  useEffect(()=>{
    if (vpflag === true){
      vehiclePanelRef.current.classList.remove('translate-y-full');
    }
    else{
      vehiclePanelRef.current.classList.add('translate-y-full');
    }
  },[vpflag]);

  return (
    <div className='m-0 p-0 relative h-screen overflow-hidden'>

      <img className='absolute w-16 left-5 top-5' src="https://cdn.mos.cms.futurecdn.net/5ij5qdSHFzJ2piPRuoTL5F.jpg" alt="" />

      <div className='h-screen w-full'>
        <img className='h-screen object-cover w-full' src="https://cdn.theatlantic.com/thumbor/BlEOtTo9L9mjMLuyCcjG3xYr4qE=/0x48:1231x740/960x540/media/img/mt/2017/04/IMG_7105/original.png" alt="" />

      </div>

      <div className=' flex flex-col justify-end absolute top-0 w-full h-screen'>
        <div className='h-[30%] p-5 bg-white relative'>

        <h4 className='mb-2 font-semibold'>Find my trip</h4>
        <button 
        onClick={()=>{
          
          panelFun2();
          setVpflag(false);
        }}
        ref={panelRef2}
        className='absolute right-5 top-4 bg-[#abf8bd] px-2 py-1 rounded-2xl hidden'>close</button>

          <form onSubmit={(e) =>{
            submitHandler(e);
          }}>

            <input 
            
            onClick={()=>{
              
              panelFun1();
            }}
            value={pickup}
            onChange={(e) =>{
              setPickup(e.target.value)
            }}
            className='bg-[#eee] p-3 w-full  my-3' type="text" placeholder='enter pick up point' />

            <input
            
            onClick={()=>{
              
              panelFun1();
            }} 
            value={destination}
            onChange={(e) =>{
              setDestination(e.target.value)
            }}
            className='bg-[#eee] p-3 w-full  my-3' type="text" placeholder='enter destination' />
            
          </form>
          
        </div>


        <div 
        ref={panelRef}
        className='bg-white w-full h-0'>

         <LocationSearchPanel setVpflag={setVpflag} />

        </div>
      </div>


      <div ref={vehiclePanelRef} className='z-4 p-3 bg-white w-full fixed bottom-0 translate-y-full'>
            <VehiclePanel setConflag={setConflag} setVpflag={setVpflag}/>
      </div>

      <div ref={confirmPanelRef} className='z-4 p-3 bg-white w-full fixed bottom-0 translate-y-full'>
            <ConformRide setConflag={setConflag}/>
      </div>

    </div>
  )
}

export default Home
