const mongoose = require('mongoose');
const Blog = require('../Models/blogModel.js')
const User = require('../Models/userModel.js')

const getAllBlogs = async(req,res) =>{
    try {
        const blogs = await Blog.find({}).populate("user")
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:'No Blogs Found'

            })
        }
        return res.status(200).send({
            success:true,
            Blogcount:blogs.length,
            message:'All blogs are Found',
            blogs
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:'Error in getting Blogs',
            success:false,
            
        })
        
    }

};

const createBlogs = async(req,res) =>{

    try {
        const {title, description, image, user} = req.body
        if(!title||!description||!image||!user){
            return res.status(400).send({
                message:'Please provide All fields',
                success:false,
                
            })

        }
        const existingUser= await User.findById(user)
        if(!existingUser){
            return res.status(404).send({
                message:'User not found',
                success:false,
                
            })

        }
        const newBlog = new Blog({title, description, image, user})
        session = await mongoose.startSession();
        session.startTransaction();

        await newBlog.save({ session });

       
        existingUser.blogs.push(newBlog);
        await existingUser.save({ session });

  
        await session.commitTransaction();
        return res.status(201).send({
            success:true,
            message:"Blog Created!!",
            newBlog
        })
        

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message:'Error in creating Blogs',
            success:false,
            
        })

        
    }finally {
        
        if (session) {
            session.endSession();
        }
    }

};

const updateBlogs = async(req,res) =>{
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const blog = await Blog.findByIdAndUpdate(
          id,
          { title, description, image },
          { new: true }
        );
        return res.status(200).send({
          success: true,
          message: "Blog Updated!",
          blog,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "Error WHile Updating Blog",
          error,
        });
      }
    };
    
const deleteBlogs = async (req, res) => {
    try {
      const blog = await Blog
        .findByIdAndDelete(req.params.id)
        .populate("user");
      await blog.user.blogs.pull(blog);
      await blog.user.save();
      return res.status(200).send({
        success: true,
        message: "Blog Deleted!",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Erorr WHile Deleteing BLog",
        error,
      });
    }
  };

const getBlogById = async(req,res) =>{
    try {
        const {id} = req.params
        const blogs = await Blog.findById(id)
        if(!blogs){
            return res.status(404).send({
                success:false,
                message:'Cannot find the Blog'

            })
        }
        return res.status(200).send({
            success:true,
            message:'Here is the Blog',
            blogs

        }) 
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message:'Error in Finding that Blog',
            success:false,
            
        })
        
    }

};
const userBlog =async(req,res) =>{
    try {
        const userBlog = await User.findById(req.params.id).populate("blogs")
        if(!userBlog){
            return res.status(404).send({
                success:false,
                message:"blogs not found with this user"
            })
        }return res.status(200).send({
            success:true,
            message:"User Blogs",
            userBlog
            
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message:'Error in Finding that Blog',
            success:false,
            error
        })
    }
}




module.exports={
    getAllBlogs,
    createBlogs,
    updateBlogs,
    deleteBlogs,
    getBlogById,
    userBlog
   
}