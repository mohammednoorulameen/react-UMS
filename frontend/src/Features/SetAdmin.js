import { createSlice } from "@reduxjs/toolkit";


export const adminDetailsSlice = createSlice({
    name:"Admin",
    initialState:{
        adminDetails: ''
    },
    reducers: {
        setAdminDetails:(state, action)=>{
            state.adminDetails = action.payload
        }
    }
})

export const { setAdminDetails } = adminDetailsSlice.actions
export default adminDetailsSlice.reducer