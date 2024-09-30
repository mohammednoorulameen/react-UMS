import React from 'react'
import { UseAuth } from './UseAuth'
import { Navigate } from 'react-router-dom'

const RequireAuth = ({ children }) => {

    const {userDetails} = UseAuth()
   console.log("log",userDetails);

    if(!userDetails){

        return <Navigate to={'/login'} />
    }
    return children
}

export default RequireAuth