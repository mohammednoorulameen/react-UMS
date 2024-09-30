import { LogOut, Edit } from "lucide-react";
import { logout, setUserDetails } from "../../../Features/SetUser";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserDetailes  } from "../../../Services/UserApi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.userDetails);

  
  const dispatch = useDispatch();
  console.log("user", user);
  useEffect(() => {
    const fetchUserDetailes = async () => {
      try {
        const response = await getUserDetailes()
      dispatch(setUserDetails(response.data.userDetails));
      } catch (error) {
        console.log("error fetching", error);
        navigate('/login')
      }
     
    };
    if (!user) {
      fetchUserDetailes();
    }
  }, [dispatch]);


  // logout
  const HandleLogout = async () => {
   try {
    // await  dispatch(setUserDetails(""));
    // await userLogout()
    dispatch(logout());
    navigate('/login')
   } catch (error) {
    console.error("Logout failed", error);
    
   }
  };

 
  const HandleEditProfile = () =>{
    navigate('/editProfile')
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-7">
        <div className="flex flex-col items-center">
          <h2 className="mt-3 text-xl font-semibold text-gray-800">
            {user?.name}
          </h2>

          <div className="mt-5 relative w-24 h-24">
            <img
              className="w-full h-full rounded-full object-cover border-4 border-blue-500"
              src={`http://localhost:3030${user?.image}`}
              alt="not"
            />
          </div>

          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {user?.email} <br />
            
            </h2>
            <p className="text-gray-600">{'Phone : '+user?.phone}</p>
          </div>

          <div className="mt-6 space-y-4 w-full">
            <button onClick={HandleEditProfile} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </button>
            {user ? (
              <button
                onClick={HandleLogout}
                className="w-full bg-white text-blue-500 border border-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-50 flex items-center justify-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            ) : (
              <button
                onClick={HandleLogout}
                className="w-full bg-white text-blue-500 border border-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-50 flex items-center justify-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Register
              </button>
            )}
            {/* <button onClick={HandleLogout} className="w-full bg-white text-blue-500 border border-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-50 flex items-center justify-center">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
