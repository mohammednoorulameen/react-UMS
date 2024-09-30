import React from 'react'
import { UseAuth } from "./UseAuth";
import { Navigate } from "react-router-dom";

const RequireForLogin = ({ children }) => {
   const {userDetails} = UseAuth()
   
   if(userDetails){
    return <Navigate to={"/"} />
   }  
   return children;
}

export default RequireForLogin