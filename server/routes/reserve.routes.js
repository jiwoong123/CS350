import express from "express";
import { gymGoerLoggedIn } from "../controller/varify.controller.js";
import { reserveEquipment } from "../controller/Equipment.controller.js";

const router = express.Router();

router.post("/add", gymGoerLoggedIn, reserveEquipment);
router.post("/cancel", gymGoerLoggedIn);
router.post("/inquire", gymGoerLoggedIn);

export default router;
