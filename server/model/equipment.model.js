import prisma from "../prisma/prisma.js";

class Equipment {
  constructor(name, description, averageUsageTime, location, recentUsage) {
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
      console.log("start");
      const gymEquipments = await prisma.gymequipments.findMany({
        include: { equipmentInfo: true },
      });
      console.log(gymEquipments);
      console.log("end");
      gymEquipments.forEach((gymEquipment) => {
        const equipInfo = gymEquipment.equipmentInfo;
        if (!equipInfo) {
          throw new Error("Invalid equipment information or missing serial number.");
        }
        console.log(gymEquipment.id);
        const equipmentInstance = new Equipment(
          equipInfo.name,
          equipInfo.description,
          gymEquipment.averageUsageTime,
          gymEquipment.location,
          gymEquipment.recentUsage
        );

        this.equipmentList[gymEquipment.id] = equipmentInstance;
      });

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  getEquipmentById(id) {
    return this.equipmentList[id] || null;
  }

  reserveEquipment(equipmentId, userId) {
    this.equipmentList[equipmentId].addToQueue(userId);
  }

  getAllEquipments() {
    return this.equipmentList;
  }
}

export const gymEquipments = new GymEquipments();