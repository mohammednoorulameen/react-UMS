const User = require("../Model/UserRegisterModel");
const expire = 3 * 24 * 60 * 60;
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY
// const asyncHandler = require('express-async-handler')
// const bcrypt = require("bcrypt");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: expire,
  });
};

// user register

const Register = async (req, res) => {
  try {
    const isExistuser = await User.findOne({ email: req.body.email });
    if (isExistuser) {
      res.status(409).json({ message: "User already exists" });

      return;
    }

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      profileImage: req.file ?. filename || null,
      password: req.body.password,
    });
    await newUser.save();

    const token = createToken(newUser._id);
    console.log("User registered Successfully :");
    res.status(201).json({ token });
  } catch (error) {
    console.error("Error registering user :", error.message);
    res.status(500).json({ erroe: error.message });
  }
};


// userlogin

const UserLogin = async (req, res) => {
  try {

   const user = await User.findOne({email: req.body.email});
    
     if (user) {
        const userPassword = req.body.password == user.password
        if(userPassword){
    const token = createToken(user._id);
    console.log("User logged successfully. Token", token,user);

    return res.status(200).json({ message: "Login successfull", 
      //  user,
       token,
       userDetails:{
        name :  user.username,
        email: user.email,
        phone: user.phone,  
        image:`/Images/${user.profileImage}`
       },
      //  status: true
         });
           
        }else{
            return res.status(401).json({message : 'password wrong  '})
        }

     }else{
        return res.status(401).json({message: 'invalid email'})
     }
  
  } catch (error) {
    console.error("error Logged in:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// user home 
const userHome = async (req,res) =>{

  const token = req.headers["authorization"]?.split(" ")[1];

    if(!token){
      return res.status(401).json({message: "token missing"})
    }
    
  try{
      const decode = jwt.verify(token,process.env.JWT_KEY)
      const user = await User.findById(decode.id)

      return res.status(200).json({ message: "Login successfull", 
         userDetails:{
          name :  user.username,
          email: user.email,
          phone: user.phone,
          image:`/Images/${user.profileImage}`
         },
        });
    
  } catch (error){
    res.json({message: 'internal server Error', status: false})
  }
}



//user Update Profile

const userUpdateProfile =async (req, res)=>{

     const token = req.headers["authorization"]?.split(" ")[1]

     if(!token){
      return res.status(401).json({message: 'token missing'})
     }
  try {

    const decoded = jwt.verify(token,JWT_KEY)
    const userId = decoded.id
  

    const {username, email, phone } = req.body
    // new image
    // const image = req.file ? req.file.filename : null
    
    let user = await User.findById(userId)

    if(!user){
      return res.status(404).json({message: "user not fount"})
    }

  //  updated filed

  user.username = username || user.username;
  user.email = email || user.email;
  user.phone = phone || user.phone;  
  user.profileImage = req.file ?. filename || user.profileImage
    

    const updateUser = await user.save();

    return res.status(200).json({message: 'profile Updated Successfully',

      userDetailes :{
        name : updateUser.username,
        email: updateUser.email,
        phone: updateUser.phone,
        image: `/Images/${updateUser.profileImage}`
      }
    })
  } catch (error) {
    console.log("Error updating user Profile",error.message);
    res.status(500).json({message: "internal server Error"})
    
  }

}
module.exports = {
  Register,
  UserLogin,
  userHome,
  // userLogout,
  userUpdateProfile
};
