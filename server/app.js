import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import testRoute from "./routes/test.routes.js";
import adminRoute from "./routes/admin.routes.js";

const app = express();

//libraries
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/admin", adminRoute);

//activate server
app.listen(8800, () => {
  console.log("server is listening");
});
