import React from 'react'
import 'remixicon/fonts/remixicon.css'


const LocationSearchPanel = (props) => {

    const locations = [
        "i2it engineering college, hinjewadi, pune",
        "Symbiosis engineering college, hinjewadi, pune",
        "Aarusha homes, rajiv gandhi infotech park, hinjewadi, pune",
        "Swatwik misal, wakad, pune",
        "i2it engineering college, hinjewadi, pune"
    ]

    return (
        <div>
            {locations.map((ele,idx) => {
                return <div key={idx} onClick={() =>{
                    props.setVpflag(true);
                }} className='m-2 p-3 flex flex-row'>
                <h4><i className="ri-map-pin-2-fill bg-[#eee] px-3 py-2 flex justify-center items-center rounded-full"></i></h4>
                <div className='ml-3'>{ele}</div>
            </div>
            })}
            
            
        </div>
    )
}

export default LocationSearchPanel
