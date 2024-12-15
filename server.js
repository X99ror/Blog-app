require('dotenv').config();
const express = require('express');
const cors = require('cors');
const colors= require('colors')
const morgan = require('morgan');
const dbconnect = require('./config/dbconnect');

const app = express()
const userRoutes = require('./routes/userRoutes.js')
const blogRoutes = require('./routes/blogRoutes.js')
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
dbconnect();
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/blog',blogRoutes)

app.listen(process.env.PORT,() => {
    console.log(`Server is running`.bgRed.white);
})

