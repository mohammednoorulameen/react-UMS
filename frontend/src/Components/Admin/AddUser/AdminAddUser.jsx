import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { adminUserRegister } from "../../../Services/AdminApi";
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("name is required")
    .min(4, "User must be at least 4 characters")
    .max(15, "User cannot be more than 15 character"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phonr number is required")
    .matches(/^\d{10,11}$/, "Enter a valid phone number"),

  profileImage: Yup.mixed()
    .required("file is requied")
    .test(
      "fileType",
      "Only image files are allowed (jpeg, png, webp gif)",
      (value) =>
        value &&
        ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
          value.type
        )
    ),
  password: Yup.string()
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9].*[0-9].*[0-9].*[0-9])/,
      "Password must cantain at least one special character and atleast four numbers"
    )
    .min(4, "Password must be at least 4 characters"),
});
const AdminAddUser = () => {
  const navigate = useNavigate();
  const [userExists, SetuserExist] = useState();
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
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("profileImage", values.profileImage);
        formData.append("password", values.password);
        console.log(formData);

        await adminUserRegister(formData);
        console.log("user registered successfully");
        navigate("/admin/admindashbord");
      } catch (error) {
        if (error.response && error.response.status == 409) {
          SetuserExist("User Alredy Exists");
        }
        console.log("Error registering user:", error.message);
      }
    },
  });

  const handleBack = () =>{
    navigate('/admin/admindashbord')
  }

  return (
    <div>
      <div className="max-w-screen-xl  border shadow sm:rounded-lg flex justify-center flex-1">
      
        <button
          type="button"
          onClick={handleBack}
          className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="mt-2 w-3.5 h-3.5 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 21"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Back
        </button>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                ADMIN - ADD - USER
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey, enter user details to create user account
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
                  {formik.touched.username && formik.errors.username && (
                    <div>{formik.errors.username}</div>
                  )}
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your email"
                  />

                  {formik.touched.email && formik.errors.email && (
                    <div>{formik.errors.email}</div>
                  )}

                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="tel"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your phone"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div>{formik.errors.phone}</div>
                  )}

                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="file"
                    name="profileImage"
                    id="profileImage"
                    onChange={(e) =>
                      formik.setFieldValue(
                        "profileImage",
                        e.currentTarget.files[0]
                      )
                    }
                    onBlur={formik.handleBlur}
                    placeholder="aplod your photo"
                  />
                  {formik.touched.profileImage &&
                    formik.errors.profileImage && (
                      <div>{formik.errors.profileImage}</div>
                    )}

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
                  {formik.touched.password && formik.errors.password && (
                    <div>{formik.errors.password}</div>
                  )}

                  <button
                    type="submit"
                    className=" mt-3 tracking-wide font-semibold bg-blue-900 text-gray-100   w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
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
                    <span className="ml-3">Admin add user</span>
                  </button>
                  {/* <p className="mt-3 text-xs text-gray-600 text-center">
                  Already have an account?{" "}
                  <Link to="/login">
                    <span className="text-blue-900 font-semibold">
                      Sign in
                    </span>
                  </Link>
                </p> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddUser;
