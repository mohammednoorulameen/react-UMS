import React from 'react'
import { UseAdminAuth } from "./UseAuth";
import { Navigate } from 'react-router-dom';
const RequireAdminAuth = ({ children }) => {
  
    const {AdminDetails} = UseAdminAuth();
    if(!AdminDetails){
        return <Navigate to={'/admin/adminlogin'}/>
    }
    return children
}

export default RequireAdminAuth