import React from 'react'
import { UseAdminAuth } from "./UseAuth";
import { Navigate } from 'react-router-dom';

const RequireAdminLogin = ({children}) => {
       const {AdminDetails} = UseAdminAuth();
       if(AdminDetails){
        return < Navigate to={"/admin/admindashbord"} />
       }
       return children
}

export default RequireAdminLogin