import express from "express";
import { adminLogin, adminLogout, adminRegister } from "../../controller/admin/admin.auth.controller.js";
import { AdminLoggedIn } from "../../middleware/varify.token.middleware.js";
import {
  newEquipmentInfo,
  addEquipments,
  initialEquipment,
} from "../../controller/admin/admin.equipment.controller.js";

const router = express.Router();

//authentication
router.post("/register", adminRegister);
router.post("/login", adminLogin);
router.get("/logout", adminLogout);

//gymequipment
router.get("/initial", AdminLoggedIn, initialEquipment);
router.post("/addequipment", AdminLoggedIn, newEquipmentInfo);
router.post("/addequipments", AdminLoggedIn, addEquipments);
router.put("/modifyequipment", AdminLoggedIn);

//gymgoers

export default router;
