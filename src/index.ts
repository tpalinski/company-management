import Express, {Response, Request, NextFunction} from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./db";


const app = Express();
dotenv.config();
connectToDatabase();

const PORT = process.env.PORT || 3001;



app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("Hello");
})


app.listen(PORT, () => {
    console.log(`Server is runinng on port ${PORT}`)
})