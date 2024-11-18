import { gymEquipments } from "../model/equipment.model.js";

export const reserveEquipment = async (req, res) => {
  const userId = req.userId;
  const { equipmentId } = req.body;

  try {
    console.log(gymEquipments.getAllEquipments());
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
