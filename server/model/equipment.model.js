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

  removeFromQueue(userId) {
    const index = this.queue.indexOf(userId);
    if (index > -1) this.queue.splice(index, 1);
  }

  getQueue() {
    return this.queue;
  }
}

class GymEquipments {
  constructor() {
    this.equipmentList = {}; // { [id]: Equipment }
  }

  async initializeEquipment() {
    try {
      const gymEquipments = await prisma.gymEquipments.findMany({
        include: { information: true },
      });

      gymEquipments.forEach((gymEquipment) => {
        const equipInfo = gymEquipment.information;
        const equipmentInstance = new Equipment(
          equipInfo.serialNumber,
          equipInfo.name,
          equipInfo.description,
          gymEquipment.averageUsageTime,
          gymEquipment.location,
          gymEquipment.recentUsage
        );

        // Store equipment instance in the list with a unique ID
        this.equipmentList[equipInfo.serialNumber] = equipmentInstance;
      });

      console.log("Equipments initialized:", this.equipmentList);
    } catch (error) {
      console.error("Error initializing equipment:", error);
    }
  }

  getEquipmentById(id) {
    return this.equipmentList[id] || null;
  }

  getAllEquipments() {
    return Object.values(this.equipmentList);
  }
}

export const gymEquipments = new GymEquipments();
