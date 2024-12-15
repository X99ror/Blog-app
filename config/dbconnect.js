const mongoose = require('mongoose');
const colors= require('colors')
const dbconnect = async () =>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log(`Connected to Database`.bgGreen.white)
        
    } catch (error) {
        console.log(`Database Connection Error`.bgBlue.white)
    }
};


module.exports = dbconnect;
