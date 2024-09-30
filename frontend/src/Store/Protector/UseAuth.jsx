import { useSelector } from "react-redux";

export const UseAuth = () =>{
    const userDetails = localStorage.getItem('userToken')
    return { userDetails }
}


export const UseAdminAuth = () =>{
    const AdminDetails = localStorage.getItem('adminToken');
    return {AdminDetails}
}