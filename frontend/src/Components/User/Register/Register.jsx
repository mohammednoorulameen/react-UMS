import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userRegister } from "../../../Services/UserApi";
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Name is required")
    .min(4, "Username must be at least 4 characters")
    .max(15, "Username cannot be more than 15 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phonr number is required")
    .matches(/^\d{10,11}$/, "Enter a valid phone number"),
    
  profileImage:Yup.mixed().required('file is requied').test(
      'fileType',
    'Only image files are allowed (jpeg, png, webp gif)',
    (value) => value && ['image/jpeg', 'image/png', 'image/webp','image/gif'].includes(value.type)
  
  ),
  password: Yup.string()
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9].*[0-9].*[0-9].*[0-9])/,
      "Password must cantain at least one special character and atleast four numbers"
    )
    .min(4, "Password must be at least 4 characters"),
});

const Register = () => {
  const [ userExists, setuserExist] = useState('')
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      profileImage: null,
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
      const formData =  new FormData();
      formData.append("username",values.username);
      formData.append("email",values.email);
      formData.append("phone",values.phone);
      formData.append("profileImage",values.profileImage)
      formData.append("password",values.password)
   
      console.log("formdata register"+ formData);

        // send form data values
        await userRegister(formData);
        console.log("User registered successfully");
        toast.success("Register successful");
        navigate("/login");
      } catch (error) {
        if(error.response && error.response.status === 409){
          setuserExist("User Alredy Exists")
        }
        console.log("Error registering user:", error.message);
        toast.error("Error Register in");
      }
    },
  });
  
  return (
    <div>
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                UMS
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey, enter your details to create your account
              </p>
            </div>
            {userExists && (
          <div className="mt-1 text-base text-center text-red-600">
            {userExists}
          </div>
        )}
            <form onSubmit={formik.handleSubmit}>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs flex flex-col gap-3">
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your name"
                  />
                  {formik.touched.username &&
                  formik.errors.username && (
                    <div>
                      {formik.errors.username}
                    </div>
                  )
                  }
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your email"
                  />

                {formik.touched.email &&
                  formik.errors.email && (
                    <div>
                      {formik.errors.email}
                    </div>
                  )
                  }

                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="tel"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your phone"
                  />
                   {formik.touched.phone &&
                  formik.errors.phone && (
                    <div>
                      {formik.errors.phone}
                    </div>
                  )
                  }

                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="file"
                    name="profileImage"
                    id="profileImage"
                    onChange={(e)=> formik.setFieldValue('profileImage',e.currentTarget.files[0])}
                    onBlur={formik.handleBlur}
                    placeholder="aplod your photo"
                  />
                  {formik.touched.profileImage &&
                  formik.errors.profileImage && (
                    <div>
                      {formik.errors.profileImage}
                    </div>
                  )
                  }

                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    name="password"
                    id="password"
                    required
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    placeholder="Password"
                  />
                {formik.touched.password &&
                  formik.errors.password && (
                    <div>
                      {formik.errors.password}
                    </div>
                  )
                  }

                  <button type="submit" className=" mt-3 tracking-wide font-semibold bg-blue-900 text-gray-100   w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                       strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin = "round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">Sign Up</span>
                  </button>
                  <p className="mt-3 text-xs text-gray-600 text-center">
                    Already have an account?{" "}
                    <Link to="/login">
                      <span className="text-blue-900 font-semibold">
                        Sign in
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
