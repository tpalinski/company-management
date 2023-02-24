import Express, {Response, Request, NextFunction} from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./db";
import { router } from "./router";
import bodyParser from "body-parser";


const app = Express();
dotenv.config();
connectToDatabase();

// middleware setup
app.use(bodyParser.json())
const PORT = process.env.PORT || 3001;

app.use('/api', router);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("Hello");
})


app.listen(PORT, () => {
    console.log(`Server is runinng on port ${PORT}`)
})