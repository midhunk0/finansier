// @ts-nocheck
import mongoose, { Schema } from "mongoose";
import { loadType }  from "mongoose-currency";

const schema=mongoose.Schema;
loadType(mongoose);

const daySchema=new schema(
    {
        date:String,
        revenue:{
            type:mongoose.Types.Currency,
            currency:"USD",
            get:(v)=>v/100
        },
        expenses:{
            type:mongoose.Types.Currency,
            currency:"USD",
            get:(v)=>v/100
        },
    },
    {toJSON:{getters:true}}
)

const monthSchema=new schema(
    {
        month:String,
        revenue:{
            type:mongoose.Types.Currency,
            currency:"USD",
            get:(v)=>v/100
        },
        expenses:{
            type:mongoose.Types.Currency,
            currency:"USD",
            get:(v)=>v/100
        },
        operationalExpenses:{
            type:mongoose.Types.Currency,
            currency:"USD",
            get:(v)=>v/100
        },
        nonOperationalExpenses:{
            type:mongoose.Types.Currency,
            currency:"USD",
            get:(v)=>v/100
        },
    },
    {toJSON:{getters:true}}
)

const KPISchema=new schema(
    {
        totalProfit:{
            type:mongoose.Types.Currency,
            currency:"USD",
            get:(v)=>v/100
        },
        totalRevenue:{
            type:mongoose.Types.Currency,
            currency:"USD",
            get:(v)=>v/100
        },
        totalExpenses:{
            type:mongoose.Types.Currency,
            currency:"USD",
            get:(v)=>v/100
        },
        expensesByCategory:{
            type:Map,
            of:{
                type:mongoose.Types.Currency,
                currency:"USD",
                get:(v)=>v/100
            }
        },
        monthlyData:[monthSchema],
        dailyData:[daySchema],
    },
    {timestamps:true, toJSON:{getters:true}}
);

const KPI=mongoose.model("KPI", KPISchema);

export default KPI;