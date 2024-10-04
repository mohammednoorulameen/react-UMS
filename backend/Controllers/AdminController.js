const User = require("../Model/UserRegisterModel");
const Admin_JWT_KEY = process.env.Admin_JWT_KEY;
const jwt = require("jsonwebtoken");
const expire = 3 * 24 * 60 * 60;
require("dotenv").config();

// create jwt token
const createToken = (id) => {
  return jwt.sign({ id }, Admin_JWT_KEY, {
    expiresIn: expire,
  });
};

// admin Login

const AdminLogin = async (req, res) => {
  try {
    const admin = await User.findOne({ email: req.body.email });

    if (admin) {
      // console.log("check",admin);
      const adminPassword = (await admin.password) == req.body.password;
      if (adminPassword && admin.isAdmin) {
        const adminToken = createToken(admin._id);
        //    console.log("Admin logged successfully. Token", adminToken,admin);
        return res.status(200).json({
          message: "logged successfully",
          adminToken,
          adminDetails: {
            name: admin.username,
            email: admin.email,
            phone: admin.phone,
            image: `/Image/${admin.profileImage}`,
          },
        });
      } else {
        return res.status(401).json({ message: "invalid password" });
      }
    } else {
      return res.status(401).json({ message: "invalid Eamil" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get admin details

const getAdminDetails = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ mesage: "token is missing" });
  }
  try {
    const decode = jwt.verify(token, Admin_JWT_KEY);
    const admin = await User.findById(decode.id);

    if (admin) {
      return res.status(200).json({
        message: "admin details",

        adminDetails: {
          name: admin.username,
          email: admin.email,
          phone: admin.phone,
          image: `/Images/${admin.profileImage}`,
        },
      });
    }
  } catch (error) {
    return res.json({ message: "internal server error", status: false });
  }
};

// get user list

const AdminGetUserList = async (req, res) => {
  try {
    const user = await User.find({ isAdmin: false  });
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

// get edit user detailes
const GetEdituserDetails = async (req, res) => {
  try {
    const id = await req.params.id;
    if (id) {
      const user = await User.findOne({ _id: id });
      return res.status(200).json({ user });
    }
  } catch (error) {
    console.log(error);
  }
};

//admin edit user

const AdminEdituser = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, email, phone } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "UprofileImageser not found" });
    }

    // update user fields

    user.username = username || user.username;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.profileImage = req.file?.filename || user.profileImage;

    const updatedUser = await user.save();
    console.log(updatedUser);

    return res.status(200).json({
      message: "profile update successfully",
      userDetails: {
        name: updatedUser.username,
        email: updatedUser.email,
        phone: updatedUser.phone,
        image: `/Image/${updatedUser.profileimage}`,
      },
    });
  } catch (error) {
    console.log("error updating", error);
    res.status(500).json({ message: "internal server error" });
  }
};

// get delete user name

const GetAdmindeleteUsername = async (req, res) =>{
  try {
    const id = req.params.id;
    const userTodelete = await User.findById(id)
    if(!userTodelete){
      return res.status(404).json({message: "user not found"})
    }
    const deleteusername = userTodelete.username;
   return res.status(200).json({message: 'delete user username',deleteusername})
  } catch (error) {
    console.log('fetch delete user username',error.mesage);
    
  }
}

// admin delete user

const AdminDeleteUser = async (req, res) => {
  try {
    const id = req.params.id;   
    await User.deleteOne({ _id: id });
    const user =await User.find({ isAdmin: { $ne: true } });
    
    
    return res.status(200).json({ message: "delete successfully", user });
  } catch (error) {
    console.log("server error", error.message);
  }
};

// register user from admin

const AdminUserRegister = async (req, res) =>{
 
  try {
    const isExistUser =await User.findOne({ email: req.body.email })
    if (isExistUser) {
     return res.status(409).json({message: "user is already exist"})
    }
         
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    profileImage: req.file ?. filename || null,
    password:req.body.password
  })

  await newUser.save()

   const token = createToken(newUser._id);
   console.log('admin user registered successfully');
   return res.status(200).json({message: "admin registered user sucessfully", token})
   
  } catch (error) {
            console.log('Error registerd user',error.message);
            res.status(500).json({error: error.message})
  }
}
module.exports = {
  AdminLogin,
  AdminGetUserList,
  getAdminDetails,
  GetEdituserDetails,
  AdminEdituser,
  GetAdmindeleteUsername,
  AdminDeleteUser,
  AdminUserRegister,
};
