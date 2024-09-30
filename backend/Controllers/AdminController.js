
const User =  require("../Model/UserRegisterModel");
const JWT_KEY = process.env.JWT_KEY
const jwt = require('jsonwebtoken')
const expire = 3 * 24 * 60 * 60


// create jwt token
const createToken = (id) =>{
    return jwt.sign({ id },JWT_KEY,{
        expiresIn: expire,
    })
}


// admin Login

const AdminLogin = async (req, res) =>{
    console.log('hello')
    try {
        const admin = await User.findOne({email: req.body.email})
        
        console.log("check admin",admin);

        if(admin){
            console.log("check",admin);
            const adminPassword = await admin.password === req.body.password
            if (adminPassword && admin.isAdmin) {
               const adminToken = createToken(admin._id) 
               console.log("Admin logged successfully. Token", adminToken,admin);
               return res.status(200).json({message:'logged successfully',
                adminToken,
                adminDetails:{
                    name: admin.username,
                    email: admin.email,
                    phone: admin.phone,
                    image : `/Image/${admin.profileImage}`
                }
               })
            }else{
                return res.status(401).json({message:'invalid password'})
            }
        }else{
            return res.status(401).json({message:'invalid Eamil'})

        }

        
    } catch (error) {
        console.log(error);
         res.status(500).json({message: 'Internal server error'})
        
    }
} 


module.exports ={
    AdminLogin,
}