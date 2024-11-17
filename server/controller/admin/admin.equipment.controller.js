import { gymEquipments } from "../../model/equipment.model.js";

export const initialEquipment = async (req, res) => {
  try {
    gymEquipments.initializeEquipment();
  } catch (err) {
    console.log(err);
    res.status(200).json({ message: "failed to initaial equipments" });
  }
};

export const addEquipment = async (req, res) => {
  const { name, description, initialAverageUsage } = req.body;
  try {
    const newEquipment = await prisma.equipments.create({
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
    const equipment = await prisma.equipments.findUnique({
      where: { name: equipmentName },
    });

    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    const newGymEquipment = await prisma.gymEquipments.create({
      data: {
        information: {
          connect: [{ serialNumber: equipment.serialNumber }],
        },
        averageUsageTime: equipment.initialAverageUsage,
        location,
      },
    });

    res.status(201).json({ message: "Gym equipment added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add gym equipment" });
  }
};
