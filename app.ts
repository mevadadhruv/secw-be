import express,{Application} from "express";
import * as dotenv from "dotenv";
import bodyParser,{ json } from "body-parser";
import { DatabaseConnection } from "./src/config/db";
import userRoutes from "./src/routes/userRoutes";

dotenv.config();
const port = process.env.PORT;
const app:Application = express();
app.use(json());
app.use(bodyParser.urlencoded({ extended:true }));

DatabaseConnection();

app.use(userRoutes);

app.listen(port, ():void => {
    console.log(`server running on ${port}`);
});