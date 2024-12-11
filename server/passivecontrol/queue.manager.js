import { gymEquipments } from "../model/equipment.model.js";

let currentEquipments = {};
let prevEquipments = {};

setInterval(() => {
  // 이전 상태가 비어 있으면 현재 상태로 초기화
  if (Object.keys(prevEquipments).length === 0) {
    prevEquipments = JSON.parse(JSON.stringify(currentEquipments));
  }

  // 기구 상태 갱신
  currentEquipments = gymEquipments.getAllEquipments();

  // 기구 상태 비교 및 상태 변경 처리
  for (let equipmentId in currentEquipments) {
    const prevEquipment = prevEquipments[equipmentId];
    const currentEquipment = currentEquipments[equipmentId];

    if (!prevEquipment) continue;

    if (prevEquipment.status === true && currentEquipment.status === false) {
      console.log(`${equipmentId}`);
      gymEquipments.popUser(equipmentId);
    }
  }

  // 이전 상태 갱신
  prevEquipments = JSON.parse(JSON.stringify(currentEquipments));
}, 3000); // 3초마다 상태 체크
