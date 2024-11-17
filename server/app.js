import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import testRoute from "./routes/test.routes.js";
import adminRoute from "./routes/admin/admin.routes.js";
import reservationRoute from "./routes/reserve.routes.js";
import monitoringRoute from "./routes/monitoring.routes.js";

const app = express();

//libraries
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/admin", adminRoute);
app.use("/api/reserve", reservationRoute);
app.use("/api/inquire", monitoringRoute);

//activate server
app.listen(8800, () => {
  console.log("server is listening");
});
