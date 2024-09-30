import React from 'react'
import { Route, Routes } from "react-router-dom";
import UserRegisterPage from '../Pages/User/UserRegisterPage';
import UserLoginPage from '../Pages/User/UserLoginPage';
import UserHomePage from '../Pages/User/UserHomePage';
import UserEditProfilePage from '../Pages/User/UserEditProfilePage';
import RequireForLogin from '../Store/Protector/RequireForLogin';
import RequireAuth from '../Store/Protector/RequireAuth';

const UserRouter = () => {
  return (
    <div>
        <Routes>
            
            <Route path='/register' element={
              <RequireForLogin>
                <UserRegisterPage/>
              </RequireForLogin>
                }/>

            <Route path='/login' element={ 
              <RequireForLogin>
                <UserLoginPage/> 
              </RequireForLogin>
              
              } />
            <Route path='/' element={ 
              <RequireAuth>
                <UserHomePage/>
              </RequireAuth>
              
              } />
            <Route path='/editProfile' element= {
              <RequireAuth>
                <UserEditProfilePage/> 
              </RequireAuth>
              
              } />
            
        </Routes>
    </div>
  )
}

export default UserRouter