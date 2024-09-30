// const jwt = require('jsonwebtoken');
// const  SECRET_KEY = process.env.SECRET_KEY

// const verifyToken = (req,res, next) =>{
//      const  token = req.header('Authorization').replace('Bearer', '');

//      if(!token){
//         return res.status(401).json({message : ' no token authorisation denied'});
//      }

//      try{
//         const decoded = jwt .verify(token, SECRET_KEY);
//         req.user = decoded;
//         next();
//      }catch(error){
//         res.status(401).json({message: ' Token is not valid'})
//      }
// }

// module.exports = {verifyToken}



// const jwt = require ("jsonwebtoken");
// const asyncHandler = require ("express-async-handler");
// const User = require ("../Model/UserRegisterModel");

//  const verifyUser = asyncHandler(async (req, res, next) => {
//   let token = req.cookies.jwt;
//   if (token) {
//     try {
//       const decode = jwt.verify(token, process.env.SECRET_KEY);

//       await User.findById(decode.id).select("-password"); // to get all details except password

//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error("Not authorized, token failed");
//     }
//   } else {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// });


// module.exports ={
//     verifyUser
// }
