import express from "express";
import { save, getContacts , getContactById , updateContactById ,DeleteContactById} from './../controller/controller.js';
import { isAuthenticate } from "../middlewares/Auth.js";



const router = express.Router();

router.post("/save", isAuthenticate,save);
router.get("/getAllContact", getContacts); 
router.get("/:id", getContactById);
router.put("/:id",  updateContactById);
router.delete("/:id",  DeleteContactById);

export const contactRoutes = router ;