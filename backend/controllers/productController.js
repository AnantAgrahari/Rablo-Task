
import proModel from "../models/productModels.js";
class proController{



    // add new products //
    static addNewProducts=async(req,res)=>{
        const{productId,Name, Price,featured, Rating,Company,email}=req.body;
        // console.log(name);
        try {
            if( productId!==undefined && Name && Price !== undefined && featured !== undefined && Rating && Company )
                {
               const addProduct=new proModel({
                productId:productId,
                name: Name,
                price: Price,
                featured: featured,
                rating: Rating,
                company: Company,
                user:req.user._id,
                email:email
               });
               const savedProduct=await addProduct.save();
               if(savedProduct)
               {
                return res.status(200).json({message:"Product added successfully"});
               }
            }
            else
            {
                return res.status(400).json({message:"all fields are required"});
            }
        } catch (err) {
            return res.status(400).json({message:err.message});
        }
    }



    // Get all products //
    static getAllProducts= async(req,res)=>{
        const {email}=req.body;
        try {
            const fetchAllProducts=await proModel.find({email:email});
            return res.status(200).json(fetchAllProducts);
        } catch (error) {
            return res.status(400).json({message:error.message});
        }
    }




    // delete a product //
    static deleteProduct=async(req,res)=>{
        const {productId}=req.body;
        try {
            const delPro=await proModel.findOneAndDelete(productId);
            
            if(delPro)
            {
                return res.status(200).json({message:"Product deleted successfully"});
            }
            else{
                return res.status(200).json({message:"Product Not found"});
            }
        } catch (error) {
            return res.status(400).json({message:error.message});
        }
    }




    // Update a product //
    static updateProduct=async(req,res)=>{
        const {productId}=req.body;
       try {
        const upPro=await proModel.findOneAndUpdate(productId);
        if(upPro)
        {
            return res.status(200).json({message:"Product updated successfully"});
        }
        else
        {
            return res.status(200).json({message:"Product not found"});
        }
       } catch (error) {
        return res.status(400).json({message:error.message});
       }
    }




    static fetchFeaturedProducts= async(req,res)=>{
        try {
            const fetchAllProducts=await proModel.find({featured: true});
            return res.status(200).json(fetchAllProducts);
        } catch (error) {
            return res.status(400).json({message:error.message});
        }
    }


    static fetchPrice= async(req,res)=>{
        const {maxPrice}=req.body;
        try {
            const fetchAllProducts=await proModel.find({ price: { $lt: maxPrice } });
            return res.status(200).json(fetchAllProducts);
        } catch (error) {
            return res.status(400).json({message:error.message});
        }
    }



    static fetchRating= async(req,res)=>{
        const {minRating}=req.body;
        try {
            const fetchAllProducts=await proModel.find({ rating: { $gt: minRating} });
            return res.status(200).json(fetchAllProducts);
        } catch (error) {
            return res.status(400).json({message:error.message});
        }
    }

}

export default  proController;