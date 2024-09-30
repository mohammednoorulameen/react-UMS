import { createSlice } from "@reduxjs/toolkit";

// const initialState ={
//     userDetails: localStorage.getItem("userDetails")
//     ?JSON.parse(localStorage.getItem("userDetails"))
//     : null,
// }


export const userDetailsSlice = createSlice({
    name:"User",
    initialState:{
        userDetails : ''
    },
    reducers: {
        setUserDetails: (state, action) =>{
            state.userDetails = action.payload
            // localStorage.setItem('userDetails',JSON.stringify(action.payload))
        },
        logout: (state) =>{
            state.userDetails = null;
            localStorage.removeItem("userToken")
        }
    }
})

export const  { setUserDetails, logout } = userDetailsSlice.actions
// export const selectUser = (state) => state.user
export default userDetailsSlice.reducer