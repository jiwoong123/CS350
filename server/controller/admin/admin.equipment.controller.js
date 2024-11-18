import { gymEquipments } from "../../model/equipment.model.js";
import prisma from "../../prisma/prisma.js";

export const initialEquipment = async (req, res) => {
  const result = await gymEquipments.initializeEquipment();

  if (result.success) {
    console.log("Equipment initialization completed successfully.");
    res.status(200).json({ message: "initialized successful" });
  } else {
    console.error("Failed to initialize equipment:", result.error);
    res.status(200).json({ message: "failed to initaial equipments" });
  }
};

export const newEquipmentInfo = async (req, res) => {
  const { name, description, initialAverageUsage } = req.body;
  try {
    const newEquipment = await prisma.equipmentinfo.create({
      data: {
        name,
        description,
        initialAverageUsage,
      },
    });

    res.status(201).json({
      message: "Equipment added successfully",
      equipment: newEquipment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add equipment" });
  }
};

export const addEquipments = async (req, res) => {
  const { equipmentName, location } = req.body;
  try {
    const equipment = await prisma.equipmentinfo.findUnique({
      where: { name: equipmentName },
    });
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    const newGymEquipment = await prisma.gymequipments.create({
      data: {
        averageUsageTime: equipment.initialAverageUsage,
        location,
        equipmentInfo: {
          connect: { id: equipment.id },
        },
      },
    });

    res.status(201).json({ message: "Gym equipment added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add gym equipment" });
  }
};
