import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from "../../../Services/AdminApi";
import { useDispatch } from 'react-redux';
import { setAdminDetails } from '../../../Features/SetAdmin';


const validationSchema = Yup.object().shape({
  email: Yup.string()
  .email("invalid email format")
  .required("email is required"),
  password: Yup.string()
  .min(4, 'password must be at least 4 characters')
  .required("password is required")
})

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues : {
      email: "", 
      password: "",

    }, 

    validationSchema: validationSchema,
    onSubmit: async (admindata) =>{
      try {
        const response = adminLogin(admindata);
        if(response.status === 200 ){
          dispatch(setAdminDetails(response.data.adminDetails))
          navigate("/admindashbord")
          localStorage.setItem("adminToken", response.data.token)
        }
        
      } catch (error) {
        
      }
    }
  })
  return (
     
    <div>
    <div className="max-w-screen-xl mt-12 flex justify-center flex-1">
      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <div className=" flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
              UMS -   ADMIN  
            </h1>
            <p className="text-[12px] text-gray-500">
              Hey, enter your details to login your account
            </p>
          </div>
          {/* {AccessError && (
        <div className="mt-1 text-base text-center text-red-600">
          {AccessError}
        </div>
      )} */}
          <form onSubmit={formik.handleSubmit}>
          
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your email"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="error-message">{formik.errors.email}</div>
                )}

                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Password"
                />

                {formik.touched.password && formik.errors.password && (
                  <div className="error-message">
                    {formik.errors.password}
                  </div>
                )}

                <button type="submit" className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Login</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Thank you{" "}
                  
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
    
  )
}

export default AdminLogin