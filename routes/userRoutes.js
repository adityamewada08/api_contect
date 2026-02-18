import express from "express";
import { signup, login } from "../controller/userController.js";


const router = express.Router();


router.post('/signup',signup);
router.post('/login',signup);
export const userRoutes = router;