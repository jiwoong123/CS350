import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./api/apiGateway/auth.routes.js";
import testRoute from "./api/apiGateway/test.routes.js";
import adminRoute from "./api/apiGateway/admin/admin.routes.js";
import reservationRoute from "./api/apiGateway/reserve.routes.js";
import usageRoute from "./api/apiGateway/usage.routes.js";
import cors from "cors";
import "./passivecontrol/queue.manager.js";

const app = express();

//libraries
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: "*", credentials: true }));

//routes
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/admin", adminRoute);
app.use("/api/reserve", reservationRoute);
app.use("/api/usage", usageRoute);

//activate server
app.listen(8800, () => {
  console.log("server is listening");
});
