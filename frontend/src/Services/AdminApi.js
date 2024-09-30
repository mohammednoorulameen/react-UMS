import {adminInstances} from '../Axios/AdminInstance'

// admin login

export const adminLogin = async (admindata) =>{
    console.log('check data admin api', admindata);
    
    try {
        const response = adminInstances.post('/adminlogin',admindata) 
        console.log("admin api response",response);
        return response
        
    } catch (error) {
        console.log('Error admin loggin in:', error.message);
        
    }
}