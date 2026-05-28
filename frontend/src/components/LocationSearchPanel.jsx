import React from 'react'
import 'remixicon/fonts/remixicon.css'

const LocationSearchPanel = (props) => {

    function handler(val) {
        if (props.activeField === 'pickup') {
            props.setPickup(val);
        }

        else if (props.activeField === 'destination') {
            props.setDestination(val);
        }
    }

    return (
        <div>

            {props.locations?.map((ele, idx) => {

                return (

                    <div
                        key={idx}

                        onClick={() => {
                            handler(ele.name);
                        }}

                        className='m-2 p-3 flex flex-row cursor-pointer'
                    >

                        <h4>
                            <i className="ri-map-pin-2-fill bg-[#eee] px-3 py-2 flex justify-center items-center rounded-full"></i>
                        </h4>

                        <div className='ml-3'>
                            {ele.name}
                        </div>

                    </div>
                )
            })}

        </div>
    )
}

export default LocationSearchPanel