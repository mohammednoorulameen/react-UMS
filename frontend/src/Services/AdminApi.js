import { useParams } from 'react-router-dom';
import {adminInstances} from '../Axios/AdminInstance'

// admin login

export const adminLogin = async (admindata) =>{
    try {
        const response =await adminInstances.post('/admin/adminlogin',admindata) 
        return response
        
    } catch (error) {
        console.log('Error admin loggin in:', error.message);
        
    }
}


// get admin details

export const getAdminDetails = async () =>{
    try {
        const response = await adminInstances.get('/admin/getAdminDetailes')
        return response
    } catch (error) {
        console.log("error get admin deatils",error);
        
    }
  }


// get user list

export const setUserList = async () =>{
   try {
    const response =await adminInstances.get('/admin/userList')
    return response
   } catch (error) {
    console.log('error Home',error.message);
    
   }
}



 // update the user details

  export const getEdituserDetails = async (id) =>{
    try {
        const response = await adminInstances.get(`/admin/getEdituserDetails/${id}`)
        //  console.log("check the admin api",response);
        return response
    } catch (error) {
        console.log('error get details' , error.message);
    }
  }


// admin edit user profile 

export const AdminEditUser = async(formData,id)=>{
    try {
        
        const response = await adminInstances.put(`/admin/adminEdituser/${id}`,formData);
        // console.log("check this",response);
        return response 
    } catch (error) {
        console.log('admin api error',error.message);
        
    }
}

// get delete username 

export const Getdeleteusername = async (id) =>{
   try {

    const response = await adminInstances.get(`/admin/adminDeleteUsername/${id}`)   
    return response
   } catch (error) {
    console.log('fetch delete user username adminapi',error.message);
    
   }
}


// admin delete user

export const AdminDeleteUser = async (id)=>{
    try {
        
        const response = await adminInstances.delete(`/admin/adminDeleteuser/${id}`)
        console.log("check admin response",response);
        
        return response
    } catch (error) {
        console.log("admin api arror",error.message);
        
    }
}

// admin register user

export const adminUserRegister = async(formData) =>{
     try {
        console.log(formData);
        const response = await adminInstances.post('/admin/adminRegisterUser',formData)
     return response
     } catch (error) {
        console.error('Error:', error);
        console.log('Error message:', error.message);
        throw error;
        
     }
}