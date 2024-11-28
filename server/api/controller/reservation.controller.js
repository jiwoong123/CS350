import { gymEquipments } from "../../model/equipment.model.js";

export const reserveEquipment = async (req, res) => {
  const userId = req.userId;
  const { equipmentId } = req.body;

  try {
    const equipment = gymEquipments.getEquipmentById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    equipment.addToQueue(userId);
    res.status(200).json({
      message: `User ${userId} added to ${equipment.name}'s queue`,
      queue: equipment.getQueue(),
    });
  } catch (err) {
    console.error("Error reserving equipment:", err);
    res.status(500).json({ message: "Failed to reserve the equipment" });
  }
};
export const cancelReservation = (req, res) => {
  const userId = req.userId;
  const { equipmentId } = req.body;

  try {
    const equipment = gymEquipments.getEquipmentById(equipmentId);

    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    if (!equipment.getQueue().includes(userId)) {
      return res.status(400).json({ message: "Reservation not found for this user" });
    }

    equipment.removeFromQueue(userId);

    return res.status(200).json({ message: "Reservation canceled successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to cancel reservation" });
  }
};

export const inquireReservations = (req, res) => {
  const userId = req.userId;

  try {
    const reservations = gymEquipments.getReservationsByUser(userId);

    if (reservations.length === 0) {
      return res.status(404).json({ message: "No reservations found for this user" });
    }
    return res.status(200).json({
      message: "Reservations retrieved successfully",
      reservations,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to retrieve reservations" });
  }
};
