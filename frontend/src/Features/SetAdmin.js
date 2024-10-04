import { createSlice } from "@reduxjs/toolkit";


export const adminDetailsSlice = createSlice({
    name:"Admin",
    initialState:{
        adminDetails: ''
    },
    reducers: {
        setAdminDetails:(state, action)=>{
            state.adminDetails = action.payload
        },
        clearAdmin:(state) =>{
            state.adminDetails = null;
            localStorage.removeItem('adminToken')
        }
    }
})

export const { setAdminDetails,clearAdmin } = adminDetailsSlice.actions
export default adminDetailsSlice.reducer