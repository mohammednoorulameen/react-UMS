import React, { useEffect, useState } from 'react'
import { setAdminDetails } from '../../../Features/SetAdmin'
import { useDispatch, useSelector } from 'react-redux'
import *as Yup from 'yup'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { getEdituserDetails,AdminEditUser } from '../../../Services/AdminApi'


const validationSchema = Yup.object().shape({
    username:  Yup.string()
    .required(("Name is required"))
    .min(4, "Username must be at least 4 characters")
    .max(15, "Username cannot be more than 15 characters"),
    email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phonr number is required")
    .matches(/^\d{10,11}$/, "Enter a valid phone number"),
})

const AdminUpdate = () => {
  const navigate = useNavigate()
 const [user, setUser] = useState()
  const { id } = useParams() 
  const dispatch = useDispatch()

  // UseEffect to fetch user details

  useEffect(() => {
    const fetchEditUserDetails = async () => {
      try {
        // console.log('check id function:', id) 
        const response = await getEdituserDetails(id) 
        // console.log("check id response:", response, id)
        setUser(response.data.user)
        dispatch(setAdminDetails(response.data.user)) 
      } catch (error) {
        console.error(error)
      }
    }

    if (id) {
      fetchEditUserDetails() // Call the function if id exists
    }
  }, [dispatch, id]) 
          


      // get user 
      useEffect(() => {
        if (user) {
          formik.setValues({
            username: user.username || "",
            email: user.email || "",
            phone: user.phone || "",
            profileImage: null,
          })
        }
      }, [user]) 
      
      const formik =  useFormik({
        enableReinitialize: true,
       initialValues:{
         username : user?.username || "",
         email : user?.email || "",
         phone : user?.phone || "",
         profileImage: null,
       },
       validationSchema:validationSchema,


       onSubmit: async (values) =>{
        console.log("values",values);

        try {
          const formData = new FormData();
          formData.append("username",values.username);
          formData.append("email",values.email);
          formData.append("phone",values.phone)
          if (values.profileImage){
            formData.append("profileImage",values.profileImage)
          } {
 
            const response = await AdminEditUser(formData,id)
            
            if (response.status == 200){
              dispatch(setAdminDetails(response.data.userDetails))
            navigate('/admin/admindashbord')
            console.log('Admin updated user');
            
            }else{
              console.log(message.error);
            }
            
          }
        } catch (error) {
          console.log('error ',error.message);
        }
       }
      })

  // const handleImageChange = (e) =>{
  //    const file = e.currentTarger.files[0]
  //    formik.setFieldValue('profileImage',file)
  // }

    return (
        <div>
        <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
        <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className=" flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                 UPDATE - USER DEATAILS
                </h1>
                <p className="text-[12px] text-gray-500">
                  Hey, update user deayailes
                </p>
              </div>

                {/* {userExists && (
                  <div className='mt-1 text-base text-center text-red-600'>
                    {userExists}
                  </div>
                )
    
                } */}
    
    
             <form onSubmit={formik.handleSubmit}>
    
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs flex flex-col gap-4">
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    name='username'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your name"
                  />
                   {formik.touched.username && formik.errors.username && (
                        <div className="error-message">
                          {formik.errors.username}
                        </div>
                      )}
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your email"
                  />
                   {formik.touched.email && formik.errors.email && (
                        <div className="error-message">
                          {formik.errors.email}
                        </div>
                      )}
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="tel"
                    name='phone'
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your phone"
                  />
                   {formik.touched.phone && formik.errors.phone && (
                        <div className="error-message">
                          {formik.errors.phone}
                        </div>
                      )}
    
                       <input
                        className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="file"
                        name="profileImage"
                        id="profileImage"
                        onChange={(e)=> formik.setFieldValue('profileImage',e.currentTarget.files[0])}
                        // onChange={handleImageChange}
                        onBlur={formik.handleBlur}
                        placeholder="aplod your photo"
                      />
                    {formik.touched.profileImage && formik.errors.profileImage && (
                        <div className="error-message">
                          {formik.errors.profileImage}
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
                    <span className="ml-3">Update</span>
                  </button>
                  
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
      )
}

export default AdminUpdate