import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/SetUser"
import adminReducer from "../Features/SetAdmin";

export default  configureStore({
    reducer:{
        user: userReducer,
        admin: adminReducer
    }
})