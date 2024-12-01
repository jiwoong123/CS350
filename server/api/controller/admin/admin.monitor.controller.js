import { gymEquipments } from "../../../model/equipment.model.js";
import { fork, spawn } from "child_process";
import path from "path";
const __dirname = path.resolve();

const pythonPath = path.join("C:", "Users", "Jiwoong", "anaconda3", "envs", "YOLOv8", "python.exe");
const analyzerPath = path.join(__dirname, "passivecontrol", "analyzer.py");
const queueManagerPath = path.join(__dirname, "passivecontrol", "queue.manager.js");
let analyzer = null;
let queueManager = null;
let prevEquipments = {};
let currentEquipments = {};

export const initialGym = async (req, res) => {
  try {
    const result = await gymEquipments.initializeEquipment();

    analyzer = spawn(pythonPath, [analyzerPath]);

    analyzer.stdout.on("data", (data) => {
      const output = data.toString().trim();
      if (output.localeCompare("True") == 0) {
        gymEquipments.changeUsage("673b06315e6648bb4da2f441", true);
        console.log("true");
      }
      if (output.localeCompare("False") == 0) {
        gymEquipments.changeUsage("673b06315e6648bb4da2f441", false);
        console.log("false");
      }
    });

    analyzer.stderr.on("data", (data) => {
      console.error("Python error:", data.toString());
    });

    analyzer.on("close", (code) => {
      console.log(`Python script finished with code ${code}`);
    });

    queueManager = fork(queueManagerPath);

    // Listen for messages from queueManager
    queueManager.on("message", (msg) => {
      console.log("Message from queueManager:", msg.toString());

      gymEquipments.popUser(msg);
    });

    if (result.success) {
      console.log("Equipment initialization completed successfully.");
      res.status(200).json({ message: "initialized successful" });
    } else {
      console.error("Failed to initialize equipment:", result.error);
      res.status(200).json({ message: "failed to initaial equipments" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "fained " });
  }
};

setInterval(() => {
  // 기구 상태 갱신
  currentEquipments = gymEquipments.getAllEquipments();
  console.log(currentEquipments);
  // 기구 상태 비교 및 상태 변경 처리
  for (const equipmentId in currentEquipments) {
    const prevEquipment = prevEquipments[equipmentId];
    const currentEquipment = currentEquipments[equipmentId];

    // 상태가 'true'에서 'false'로 변경된 경우
    if (prevEquipment && currentEquipment && prevEquipment.status === true && currentEquipment.status === false) {
      console.log(`${equipmentId}`);
      gymEquipments.popUser(equipmentId); // 상태가 false로 변경되면 대기열에서 사용자 제거
    }
  }

  // 상태 변화가 있는 경우 부모 프로세스로 전송
  if (JSON.stringify(prevEquipments) !== JSON.stringify(currentEquipments)) {
    process.send(currentEquipments);
  }

  // 이전 상태 갱신
  prevEquipments = { ...currentEquipments };
}, 1000); // 1초마다 상태 체크

export const killGym = (req, res) => {
  if (analyzer) {
    analyzer.kill();
    console.log("Analyzer process killed");
    res.status(200).json({ message: "reservation manager stopped" });
  } else {
    console.log("No analyzer process to kill");
    res.status(400).json({ message: "No analyzer process running" });
  }
};
