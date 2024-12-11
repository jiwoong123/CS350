import express from "express";
import { gymGoerLoggedIn } from "../middleware/varify.token.middleware.js";
import { reserveEquipment, cancelReservation, inquireReservations } from "../controller/reservation.controller.js";

const router = express.Router();

router.post("/reserve", gymGoerLoggedIn, reserveEquipment);
router.post("/cancel", gymGoerLoggedIn, cancelReservation);
router.get("/inquire", gymGoerLoggedIn, inquireReservations);

export default router;
