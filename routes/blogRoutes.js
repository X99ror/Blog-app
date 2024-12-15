const express = require('express')
const { getAllBlogs, createBlogs, updateBlogs, deleteBlogs, getBlogById, userBlog } = require('../controllers/blogControllers.js')
const router = express.Router()

router.get('/all-blogs',getAllBlogs)
router.post('/create-blog',createBlogs)
router.put('/update-blog/:id',updateBlogs)
router.delete('/delete-blog/:id',deleteBlogs)
router.get('/get-blog/:id',getBlogById)
router.get('/user-blog/:id',userBlog)

module.exports = router