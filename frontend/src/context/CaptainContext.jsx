import React, { createContext, useState } from 'react'

export const CaptainDataContext = createContext();


const CaptainContext = ({children}) => {

    const [captain,setCaptain] = useState(null);
    const [isloading,setIsloading] = useState(false);
    const [error,setError] = useState(null);

    const updateCaptain = (captain) =>{
        setCaptain(captain);
    }
    const value  = {
        captain,
        setCaptain,
        isloading,
        setIsloading,
        error,
        setError,
        updateCaptain
    }

  return (
    <CaptainDataContext.Provider value={value}>
        {children}
    </CaptainDataContext.Provider>
  )
};

export default CaptainContext
