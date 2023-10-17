import User from "../models/userModel.js"
import asyncHandler from "../middleware/asyncHandler.js"
import generateToken from "../utils/generateToken.js";


const authUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body;

       
   const user = await User.findOne({email})
    
   if(user && (await user.matchPassword(password))) {

      generateToken(res,user._id )

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isNotify: user.isNotify,
            isDetails: user.isDetails,
            isActive: user.isActive
        })
    }
    else {
        res.status(401)
        throw new Error("Email or Password Invalid")
    }
})

const registerUser = asyncHandler(async(req,res)=>{
    const {name, email, password} = req.body
    
    
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400);
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {

        generateToken(res, user._id)

        res.status(201).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isNotify: user.isNotify,
            isDetails: user.isDetails,
            isActive: user.isActive
        })
    }
    else {

    }
})

const logoutUser = asyncHandler(async(req,res)=>{

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json("message: Logged Out")
})

const getUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)

    if(user) {
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isNotify: user.isNotify,
            isActive: user.isActive,
            isDetails: user.isDetails
        })
    }
    else {
        res.status(404);
        throw Error ("User not found")
    }
})

const updateUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)

  
    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if(req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(200).json({
            _id:updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            password: updatedUser.password
        })
    }
    else {
        res.status(404)
        throw new Error ("User not found");
    }
})

const getUsers = asyncHandler(async(req,res)=>{
    
    const users = await User.find({})
    res.status(200).json(users)
})

const deleteUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.parms.id).select('-password')

    if (user) {
        await User.deleteOne({_id:user._id})
        res.status(200).json({messsage: "User Deleted"})
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
})

const getUserById = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.parms.id).select('-password')

    if (user) {
        res.status(200).json(user)
    }
    else {
        res.status(400)
        throw new Error("No user found")
    }
})

const updateUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin) || user.isAdmin
        user.isActive = Boolean(req.body.isActive) || user.isActive
        user.isNotify = Boolean(req.body.isNotify) || user.isNotify
        user.isDetails = Boolean(req.body.isDetails) || user.isDetails


        const updatedUser = await user.save()

        res.status(200).json({
            _id:updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isActive: updatedUser.isActive,
            isDetails: updatdeUser.isDetails,
            isNotify: updatedUser.isNotify
        })

        

    }
    else {
        res.status(400)
        throw new Error("User not found")
    }
})

export {
    updateUser,
    getUserById,
    deleteUser,
    getUsers,
    updateUserProfile,
    getUserProfile,
    logoutUser,
    authUser,
    registerUser
    
    
}






