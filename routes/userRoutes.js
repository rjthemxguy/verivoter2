import  express  from "express";
import {
    updateUser,
    getUserById,
    deleteUser,
    getUsers,
    updateUserProfile,
    getUserProfile,
    logoutUser,
    authUser,
    test,
    registerUser } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router()


router.route("/").get(getUsers).post(registerUser)
router.post("/logout", logoutUser)
router.post("/auth", authUser)
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile)
router.route("/:id").delete(protect,admin,deleteUser).put(protect,admin,updateUser).get(protect,admin,getUserById)


    
export default router