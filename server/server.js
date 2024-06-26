import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import mongoose from "mongoose";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import morgan from "morgan"
import dotenv from "dotenv";


dotenv.config();
const csrfProtection = csrf({ cookie: true });

// create express app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE, {

  })
  .then(() => console.log("**DB CONNECTED**"))
  .catch((err) => console.log("DB CONNECTION ERR => ", err));

// apply middlewares
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

// route


// readdirSync("./routes").map((r) =>
//   app.use("/api", async () => {
//     await import(`./routes/${r}`);
//   })
// );

for (const r of readdirSync("./routes")) {
  app.use("/api", (await import(`./routes/${r}`)).default);
}
// csrf
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
