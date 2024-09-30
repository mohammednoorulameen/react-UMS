import React from 'react'
import { UseAdminAuth } from "../Protector/UseAuth";
import { Navigate } from 'react-router-dom';
const RequireAdminAuth = () => {
  
    const {AdminDetails} = UseAdminAuth({children});

    if(!AdminDetails){
        return <Navigate to={'/login'}/>
    }
    return children
}

export default RequireAdminAuth