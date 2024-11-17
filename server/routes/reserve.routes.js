import express from "express";
import { gymGoerLoggedIn } from "../middleware/varify.token.middleware.js";
import { reserveEquipment } from "../controller/reservation.controller.js";

const router = express.Router();

router.post("/reserve", gymGoerLoggedIn, reserveEquipment);
router.post("/cancel", gymGoerLoggedIn);
router.post("/inquire", gymGoerLoggedIn);

export default router;
