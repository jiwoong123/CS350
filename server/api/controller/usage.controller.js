import { gymEquipments } from "../../model/equipment.model.js";

export const getUsages = (req, res) => {
  const equipments = gymEquipments.getAllEquipments();
  if (!equipments) res.status(500).json({ message: "system is not allowed" });
  else res.status(200).json(equipments);
};

export const getUsage = (req, res) => {
  const equipmentId = req.params.id;
  console.log(equipmentId);
  const equipment = gymEquipments.getEquipmentById(equipmentId);
  if (!equipment) {
    res.status(500).json({ message: "wrong equipment id" });
  } else {
    res.status(200).json(equipment);
  }
};
