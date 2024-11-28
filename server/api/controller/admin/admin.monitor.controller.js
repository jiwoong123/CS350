import { gymEquipments } from "../../../model/equipment.model.js";
import { spawn } from "child_process";
import path from "path";
const __dirname = path.resolve();

const pythonPath = path.join("C:", "Users", "Jiwoong", "anaconda3", "envs", "YOLOv8", "python.exe");
const analyzerPath = path.join(__dirname, "passivecontrol", "analyzer.py");

export const initialGym = async (req, res) => {
  try {
    const result = await gymEquipments.initializeEquipment();

    const analyzer = spawn(pythonPath, [analyzerPath]);

    analyzer.stdout.on("data", (data) => {
      const output = data.toString().trim();
      console.log("Received from Python:", output);
    });

    analyzer.stderr.on("data", (data) => {
      console.error("Python error:", data.toString());
    });

    analyzer.on("close", (code) => {
      console.log(`Python script finished with code ${code}`);
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

// export const killGym = (req, res) => {
//   reservationManager.kill();
//   res.status(200).json({ message: "reservationmanager stoped" });
// };
