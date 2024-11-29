import express from "express";
import { adminLogin, adminLogout, adminRegister } from "../../controller/admin/admin.auth.controller.js";
import { AdminLoggedIn } from "../../middleware/varify.token.middleware.js";
import { newEquipmentInfo, addEquipments } from "../../controller/admin/admin.db.controller.js";
import { initialGym, killGym } from "../../controller/admin/admin.monitor.controller.js";

const router = express.Router();

//authentication
router.post("/register", adminRegister);
router.post("/login", adminLogin);
router.get("/logout", adminLogout);

//gymequipment
router.get("/initial", AdminLoggedIn, initialGym);
router.post("/addequipment", AdminLoggedIn, newEquipmentInfo);
router.post("/addequipments", AdminLoggedIn, addEquipments);
router.put("/modifyequipment", AdminLoggedIn);
router.get("/killgym", AdminLoggedIn, killGym);
//gymgoers manage

export default router;
