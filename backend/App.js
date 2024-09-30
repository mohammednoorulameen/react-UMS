const express = require('express');
const connectDB = require('./Config/dbConnection')
const cors = require('cors');
const userRouter = require('./Routes/UserRoutes');
const adminRouter = require('./Routes/AdminRouter');
const path = require('path');
require('dotenv').config()

const PORT = process.env.PORT || 3030

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/Images', express.static(path.join(__dirname, 'public', 'Images')));

connectDB()

app.use('/',userRouter)
app.use('/admin',adminRouter)
app.listen(PORT,()=>{
    console.log(`server is running${PORT}`);
    
})
