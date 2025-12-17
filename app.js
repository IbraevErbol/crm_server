import express from "express";
import cors from "cors";
import ItemRoutes from "./routes/routes.js"
import { connectDB } from "./config/db.js";

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use('/', ItemRoutes);


app.listen(3000, () => console.log("Server running on port 3000"));