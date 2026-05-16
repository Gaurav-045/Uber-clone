import React, { use, useRef, useState } from 'react'

const Home = () => {

  const [pickup,setPickup] = useState('');
  const [destination,setDestination] = useState('');

  const panelRef = useRef();
  const panelRef2 = useRef();

  const submitHandler = () =>{
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


  return (
    <div className='m-0 p-0 relative h-screen'>

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
        className='bg-red-300 w-full '>
            
        </div>
      </div>


    </div>
  )
}

export default Home
