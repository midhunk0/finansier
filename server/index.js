import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";

//configuration
dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const frontEndUrl=process.env.VITE_ENV==='development'
    ? process.env.DEV_FRONT_END_URL
    : process.env.PROD_FRONT_END_URL;
app.use(cors({
    origin: frontEndUrl
}));

//routes
app.use("/kpi", kpiRoutes);
app.use("/product",productRoutes);
app.use("/transaction",transactionRoutes);

//mongoose setup
const PORT=process.env.PORT || 9000;
mongoose
    .connect(`${process.env.MONGO_URL}`)
    .then(async ()=>{
        app.listen(PORT,()=>console.log(`Server Port:${PORT}`));
        //add data one time only or as needed
        // await mongoose.connection.db.dropDatabase();//delete all items in database so dont use in projects
        // KPI.insertMany(kpis);
        // Product.insertMany(products);
        // Transaction.insertMany(transactions);
    })
    .catch((error)=>console.log(`${error} did not connect`));