import { gymEquipments } from "../model/equipment.model.js";
process.on("message", (msg) => {
  console.log("received");
  if (msg.currentEquipment) {
    // 부모 프로세스에서 전달받은 기구 데이터 처리
    console.log("Received equipment data from parent:", msg.currentEquipment);

    // 기구 상태를 모니터링하고 처리하는 로직
    monitorEquipmentStatus(msg.currentEquipment, msg.prevEquipment);
  }
});
let prevEquipments = {};

function monitorEquipmentStatus(current, prev) {
  console.log("function");

  for (const equipmentId in current) {
    // 상태가 'true'에서 'false'로 변경된 경우
    if (prev && current && prev[equipmentId].status === true && current[equipmentId].status === false) {
      console.log(`Status of equipment ${equipmentId} changed to false.`);
      gymEquipments.popUser(equipmentId); // 상태가 false로 변경되면 대기열에서 사용자 제거
      process.send({ equipmentId });
    }
  }

  // 상태 변화가 있는 경우 부모 프로세스로 전송
  if (JSON.stringify(prev) !== JSON.stringify(current)) {
    process.send(currentEquipments);
  }
}
