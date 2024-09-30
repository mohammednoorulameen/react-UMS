import React from 'react'
import { UseAdminAuth } from "./UseAuth";
import { Navigate } from 'react-router-dom';

const RequireAdminLogin = ({children}) => {
       const {adminDetails} = UseAdminAuth();
       if(adminDetails){
        return < Navigate to={"/admin/dashboard"} />
       }
       return children
}

export default RequireAdminLogin