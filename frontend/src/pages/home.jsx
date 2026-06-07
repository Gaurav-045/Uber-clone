import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConformRide from '../components/ConformRide';
import WaitingFordriver from '../components/WaitingFordriver';
import DriverConf from '../components/DriverConf';
import { UserDataContext } from '../context/UserContext';
import { SocketContext1 } from '../context/SocketContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../components/MapComponent';


const Home = () => {

  const navigate = useNavigate();

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [vpflag, setVpflag] = useState(false);
  const [conflag, setConflag] = useState(false);
  const [capFound, setCapFound] = useState(false);
  const [driveFlag, setDriveFlag] = useState(false);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState('');
  const [rideData, setRideData] = useState(null);

  const [segg1, setSegg1] = useState([]);
  const [activeField, setActiveField] = useState(null);

  const panelRef = useRef();
  const panelRef2 = useRef();
  const vehiclePanelRef = useRef();
  const confirmPanelRef = useRef();
  const waitingRef = useRef();
  const driverRef = useRef();


  const { user } = useContext(UserDataContext);
  const { sendMessage, receiveMessage, socket } = useContext(SocketContext1);

  useEffect(() => {
    sendMessage("join", { userId: user._id, userType: 'user' });

  }, [user])


  useEffect(() => {
    socket.on('accept-ride', (data) => {
      setRideData(data);
      setDriveFlag(true);
    })
  }, [socket])


  useEffect(() => {
    socket.on('otp-confirm', (data) => {
      navigate('/riding', { state: { ride: data } });
    });
  }, [socket]);

  async function serverCallFun(val) {

    try {

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/autocomplete`, {
        params: { input: val },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      const suggetion = response.data.suggestions;
      setSegg1(suggetion);


    } catch (error) {
      console.log(error);
    }

  }

  async function getFare() {
    setVpflag(true);

    try {

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickUp: pickup, destination: destination },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setFare(response.data.fare);
      console.log(response.data.fare);

    } catch (err) {
      console.log(err);
    }
  }

  async function createRide() {
    try {

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create-ride`, {
        pickUp: pickup,
        destination: destination,
        vehicleType: vehicleType
      },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )

      const data = response.data;
      console.log(data);

    } catch (err) {
      console.log(err);
    }
  }


  const submitHandler = (e) => {
    e.preventDefault();
  }

  const panelFun1 = () => {
    panelRef.current.style.height = '70%';
    panelRef2.current.classList.remove('hidden');
  }
  const panelFun2 = () => {
    panelRef.current.style.height = '0%';
    panelRef2.current.classList.add('hidden');
  }

  useEffect(() => {
    if (conflag === true) {
      confirmPanelRef.current.classList.remove('translate-y-full');
    }
    else {
      confirmPanelRef.current.classList.add('translate-y-full');
    }
  }, [conflag]);

  useEffect(() => {
    if (vpflag === true) {
      vehiclePanelRef.current.classList.remove('translate-y-full');
    }
    else {
      vehiclePanelRef.current.classList.add('translate-y-full');
    }
  }, [vpflag]);

  useEffect(() => {
    if (capFound === true) {
      waitingRef.current.classList.remove('translate-y-full');
    }
    else {
      waitingRef.current.classList.add('translate-y-full');
    }
  }, [capFound]);

  useEffect(() => {
    if (driveFlag === true) {
      driverRef.current.classList.remove('translate-y-full');
    }
    else {
      driverRef.current.classList.add('translate-y-full');
    }
  }, [driveFlag]);



  return (
    <div className='m-0 p-0 relative h-screen overflow-hidden'>

      <img className='absolute w-16 right-5 top-5' src="https://cdn.mos.cms.futurecdn.net/5ij5qdSHFzJ2piPRuoTL5F.jpg" alt="" />

      <div className="fixed top-0 left-0 h-screen w-full z-0">
        <MapComponent />
      </div>

      <div className=' flex flex-col justify-end absolute top-0 w-full h-screen'>
        <div className='h-[35%] p-5 bg-white relative'>

          <h4 className='mb-2 font-semibold'>Find my trip</h4>
          <button
            onClick={() => {

              panelFun2();
              setVpflag(false);
            }}
            ref={panelRef2}
            className='absolute right-5 top-4 bg-[#abf8bd] px-2 py-1 rounded-2xl hidden'>close</button>

          <form onSubmit={(e) => {
            submitHandler(e);
          }}>

            <input

              onClick={() => {

                panelFun1();
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                setActiveField('pickup');
                serverCallFun(e.target.value);

              }}
              className='bg-[#eee] p-3 w-full  my-3' type="text" placeholder='enter pick up point' />

            <input

              onClick={() => {

                panelFun1();
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setActiveField('destination');
                serverCallFun(e.target.value);
              }}
              className='bg-[#eee] p-3 w-full  my-3' type="text" placeholder='enter destination' />

          </form>

          <button className='w-full py-2 bg-black text-white text-center rounded-lg'
            onClick={() => {
              getFare();
              panelFun2();
            }}
          >
            Find Trip
          </button>

        </div>


        <div
          ref={panelRef}
          className='bg-white w-full h-0'>

          <LocationSearchPanel setVpflag={setVpflag} locations={segg1} activeField={activeField}
            setDestination={setDestination} setPickup={setPickup} />

        </div>
      </div>


      <div ref={vehiclePanelRef} className='z-4 p-3 bg-white w-full fixed bottom-0 translate-y-full'>
        <VehiclePanel setConflag={setConflag} setVpflag={setVpflag} fare={fare} setVehicleType={setVehicleType} />
      </div>

      <div ref={confirmPanelRef} className='z-4 p-3 bg-white w-full fixed bottom-0 translate-y-full'>
        <ConformRide setConflag={setConflag} setCapFound={setCapFound} pickup={pickup}
          destination={destination} createRide={createRide} fare={fare} vehicleType={vehicleType} />
      </div>

      <div ref={waitingRef} className='z-4 p-3 bg-white w-full fixed bottom-0 translate-y-full'>
        <WaitingFordriver setCapFound={setCapFound} pickup={pickup}
          destination={destination} fare={fare} vehicleType={vehicleType} />
      </div>

      <div ref={driverRef} className='z-4 p-3 bg-white w-full fixed bottom-0 translate-y-full'>
        <DriverConf setDriveFlag={setDriveFlag} rideData={rideData} />
      </div>

    </div>
  )
}

export default Home
