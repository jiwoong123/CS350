import prisma from "../prisma/prisma.js";

class Equipment {
  constructor(id, name, description, averageUsageTime, location, recentUsage) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.averageUsageTime = averageUsageTime;
    this.location = location;
    this.recentUsage = recentUsage;
    this.queue = []; // 대기열
  }

  addToQueue(userId) {
    this.queue.push(userId);
  }

  removeFromQueue(user) {
    const index = this.queue.indexOf(user);
    if (index > -1) this.queue.splice(index, 1);
  }
  getQueue() {
    return this.queue;
  }
}

const equipments = {};

export const initialEquipment = async (req, res) => {
  try {
    const equipmentList = await prisma.gymEquipments.findMany({
      include: { information: true },
    });
    console.log(equipmentList);
    equipmentList.forEach((gymEquipment) => {
      const equipInfo = gymEquipment.information;
      console.log(equipInfo);
      const equipmentInstance = new Equipment(
        equipInfo.serialNumber,
        equipInfo.name,
        equipInfo.description,
        gymEquipment.averageUsageTime,
        gymEquipment.location,
        gymEquipment.recentUsage
      );
      equipments[equipInfo.name] = equipmentInstance;
    });

    res.status(200).json({ message: "Gym initialized", equipments });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to initial the gym" });
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

    res.status(201).json({ message: "Equipment added successfully", equipment: newEquipment });
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

export const reserveEquipment = async (req, res) => {
  const userId = req.userId;
  const { equipmentId } = req.body;
  try {
    console.log(equipments);
    const equipment = equipments[equipmentId];
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    equipment.addToQueue(userId);
    res.status(200).json({ message: ` added to ${equipment.name} queue` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to reserve the gym" });
  }
};
