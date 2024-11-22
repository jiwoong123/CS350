import { gymEquipments } from "./equipment.model.js";

process.on("message", (msg) => {
  console.log("Message from parent:", msg);
});

setInterval(() => {
  gymEquipments.popUser("673b06315e6648bb4da2f441");
}, 3000);
