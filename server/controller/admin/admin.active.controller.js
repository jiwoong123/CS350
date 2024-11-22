import { gymEquipments } from "../../model/equipment.model.js";
import { fork } from "child_process";

export const initialGym = async (req, res) => {
  const result = await gymEquipments.initializeEquipment();
  // const reservationManager = fork("model/reservation.manager.js");
  // reservationManager.on("message", (msg) => {
  //   console.log("Message from child", msg);
  // });
  if (result.success) {
    console.log("Equipment initialization completed successfully.");
    res.status(200).json({ message: "initialized successful" });
  } else {
    console.error("Failed to initialize equipment:", result.error);
    res.status(200).json({ message: "failed to initaial equipments" });
  }
};

// export const killGym = (req, res) => {
//   reservationManager.kill();
//   res.status(200).json({ message: "reservationmanager stoped" });
// };
