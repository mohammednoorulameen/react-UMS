import { userInstances } from '../Axios/UserInstance'



// user registration
export const userRegister = async (formData)=>{
    try {
  
        const response = await userInstances.post('/api/users/register',formData)
    return response.data;
    } catch (error) {
        console.error('Error:', error);
        console.log('Error message:', error.message);
        throw error;
    }     
}


// user login
export const userlogin =async (userdata)=>{
    try {
         
        const response = await userInstances.post('/api/users/login',userdata);
        return response
    } catch (error) {
        console.log('Error loggin in:', error.message);
        throw error;
        
    }
}

// get home
export const getUserDetailes = async () =>{
    try {
        const response = await userInstances.get('/userHome')
    return response
    } catch (error) {
        console.log('error Home',error.message);
        
    }
    
}



// user update profile

export const userEditProfile = async (updateformData) =>{
    try {
        // console.log('api edit formData'+updateformData);
        const response = await userInstances.put('/userEditProfile',updateformData);
        // console.log("check update",response);
        return response 
    } catch (error) {
        
    }
}