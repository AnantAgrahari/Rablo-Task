
import mongoose from "mongoose";
const productSchema=new mongoose.Schema({

    productId:{
        type: String,
        required: [true,"Please enter the productId"],
        unique: true
    },
    name:{
        type:String,
        required: [true,"Please enter the Name"]
    },
    price:{
        type:Number,
        required: [true,"Please enter the price"]
    },
   featured:{
        type:Boolean,
        required: true,
        default: false
    },
   rating:{
        type: Number,
    },
    company:{
        type:String,
        required: [true,"Please enter the company name"]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        refer:"users",
    },
},
 {timestamps: true}
);
const proModel=mongoose.model("task",productSchema);
export default proModel;

