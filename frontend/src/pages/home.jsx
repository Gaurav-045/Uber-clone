import React from 'react'

const Home = () => {
  return (
    <div className='m-0 p-0 relative h-screen'>

      <img className='absolute w-16 left-5 top-5' src="https://cdn.mos.cms.futurecdn.net/5ij5qdSHFzJ2piPRuoTL5F.jpg" alt="" />

      <div className='h-screen w-full'>
        <img className='h-screen object-cover w-full' src="https://cdn.theatlantic.com/thumbor/BlEOtTo9L9mjMLuyCcjG3xYr4qE=/0x48:1231x740/960x540/media/img/mt/2017/04/IMG_7105/original.png" alt="" />

      </div>

      <div className=' flex flex-col justify-end absolute top-0 w-full h-screen'>
        <div className='h-[30%] p-5 bg-white'>
          <form >
            <input className='bg-[#eee] p-3 w-full  my-3' type="text" placeholder='enter pick up point' />
            <input className='bg-[#eee] p-3 w-full  my-3' type="text" placeholder='enter destination' />
          </form>
        </div>
        <div className='h-[70%] p-4 bg-red-300 w-full hidden '>
              content
        </div>
      </div>


    </div>
  )
}

export default Home
