const mongoose = require('mongoose')
require('dotenv').config();
const MONGODB_URL  = process.env.MONGODB_URL
const connectDB = async () =>{
    try{
        await mongoose.connect( 'mongodb://localhost:27017/React-UMS',{
            // await mongoose.connect(MONGODB_URL ,{
            // useNewUrlParser : true,
            // useUnifiedTopology: true
        });
        console.log('MongoDB connected Successfully');
        
    }catch(error){
        console.log('Error connecting to mongoDB :', error.message);
        
        
    }
}


module.exports = connectDB;