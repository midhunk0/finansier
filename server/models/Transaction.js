import mongoose, { Schema } from "mongoose";
import { loadType }  from "mongoose-currency";

const schema=mongoose.Schema;
loadType(mongoose);

const TransactionSchema=new schema(
    {
        buyer:{
            type: String,
            required: true,
        },
        amount:{
            type:mongoose.Types.Currency,
            currency:"USD",
            get:(v)=>v/100
        },
        productIds:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Products",
            }
        ],
    },
    { timestamps:true, toJSON:{ getters:true }}
);

const Transaction=mongoose.model("Transaction", TransactionSchema);

export default Transaction;