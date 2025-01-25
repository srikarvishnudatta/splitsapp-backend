import express from "express";
import {config} from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";

config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(cors({origin: "http://localhost:5173"}));
// app.use(cookieParser())

const PORT = process.env.PORT || 4000

app.listen(PORT, () =>{
    console.log("listening on PORT:", PORT); 
});



