import  express  from "express";

import { getVoters } from "../controllers/rivCoController.js";

const router = express.Router()


router.route("/").get(getVoters)

export default router