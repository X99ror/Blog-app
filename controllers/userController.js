const User = require('../Models/userModel.js')
const bcrypt = require("bcrypt")


const getAllUsers = async(req,res) => {
    try {
        
        const users = await User.find({})
        return res.status(200).send({
            userCount:users.length,
            message:'All users data found',
            success:true,
            users,

        })


       
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:'Error in Finding users',
            success:false,
            error

        })
    }

};

const registerUser = async(req,res) => {
    try {

        const {username, email, password} = req.body
        if(!username||!email||!password){
            return res.status(400).send({
                message:'Please fill all the fields',
                success:false,
               
    
            })

        }
        const existinguser = await User.findOne({email})
        if(existinguser){
            return res.status(400).send({
                message:'User Already exists',
                success:false,
               
    
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const data = new User({
            username, 
            email, 
            password:hashedPassword
        })
        const saved = await data.save()
        return res.status(200).send({
            message:'User created',
            success:true,
            data:saved

        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:'Error in user registration',
            success:false,
            
        })
    }

};

const login = async(req,res) => {
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(401).send({
                message:'Please provide email or password',
                success:false,
               
    
            })

        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(200).send({
                message:'Email is not registered',
                success:false,
                
            })

        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).send({
                message:'Invalid username or password',
                success:false,
               
    
            })
        }
        return res.status(200).send({
            success:true,
            message:'login successful',
            user

        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:'Error in Login',
            success:false,
            
        })
        
    }

};

module.exports={
    getAllUsers,
    registerUser,
    login
}