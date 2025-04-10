import express from "express";
import {config} from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import groupRouter from "./routes/group.router";
import cors from "cors";
import homeRouter from "./routes/home.router";
import authenticate from "./middleware/authenticate";
import authRouter from "./routes/auth.router";

config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const PORT = process.env.PORT || 4000;

app.use("/auth", authRouter);
app.use("/", authenticate, homeRouter);
app.use("/groups", authenticate, groupRouter);

app.use(errorHandler);

app.listen(PORT, () =>{
    console.log("listening on PORT:", PORT); 
});



