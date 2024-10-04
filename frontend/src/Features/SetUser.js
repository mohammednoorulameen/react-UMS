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
        clearUser: (state) =>{
            state.userDetails = null;
            localStorage.removeItem("userToken")
        }
    }
})

export const  { setUserDetails, clearUser } = userDetailsSlice.actions
// export const selectUser = (state) => state.user
export default userDetailsSlice.reducer