import express from "express";
import { adminLogin, adminLogout, adminRegister } from "../controller/admin.controller.js";
import { AdminLoggedIn } from "../controller/varify.controller.js";
import { addEquipment, addEquipments, initialEquipment } from "../controller/Equipment.controller.js";

const router = express.Router();

router.post("/register", adminRegister);
router.post("/login", adminLogin);
router.get("/logout", adminLogout);

router.get("/initialGym", AdminLoggedIn, initialEquipment);
router.post("/addEquipment", AdminLoggedIn, addEquipment);
router.post("/addEquipments", AdminLoggedIn, addEquipments);

export default router;
