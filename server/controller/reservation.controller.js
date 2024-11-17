import { gymEquipments } from "../model/equipment.model.js";

export const reserveEquipment = async (req, res) => {
  const userId = req.userId; // 사용자 ID (인증 미들웨어에서 전달된다고 가정)
  const { equipmentId } = req.body; // 요청에서 기구 ID 추출

  try {
    const equipment = gymEquipments.getEquipmentById(equipmentId); // 기구 객체 검색
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" }); // 기구가 없을 경우
    }

    equipment.addToQueue(userId); // 대기열에 사용자 추가
    res.status(200).json({
      message: `User ${userId} added to ${equipment.name}'s queue`,
      queue: equipment.getQueue(), // 현재 대기열 정보 반환
    });
  } catch (err) {
    console.error("Error reserving equipment:", err);
    res.status(500).json({ message: "Failed to reserve the equipment" }); // 서버 에러
  }
};
