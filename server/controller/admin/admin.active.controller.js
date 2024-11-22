import { gymEquipments } from "../../model/equipment.model.js";

export const initialGym = async (req, res) => {
  const result = await gymEquipments.initializeEquipment();

  if (result.success) {
    console.log("Equipment initialization completed successfully.");
    res.status(200).json({ message: "initialized successful" });
  } else {
    console.error("Failed to initialize equipment:", result.error);
    res.status(200).json({ message: "failed to initaial equipments" });
  }
};
