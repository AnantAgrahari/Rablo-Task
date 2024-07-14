import express from "express";
import AuthController from "../controllers/authController.js";
import proController from "../controllers/productController.js";
import checkIsUserAuthenticated from "../middlewares/authMiddleware.js";
const router=express.Router();


router.post("/user/register",AuthController.userRegistration);
router.post("/user/login",AuthController.userLogin);

//protected routes//
router.post("/add/products",checkIsUserAuthenticated,proController.addNewProducts);
router.post("/get/allproducts",checkIsUserAuthenticated,proController.getAllProducts);
router.delete("/delete/product",checkIsUserAuthenticated,proController.deleteProduct);
router.put("/update/product",checkIsUserAuthenticated,proController.updateProduct);

router.get("/fetch/product",checkIsUserAuthenticated,proController.fetchFeaturedProducts);
router.get("/fetch/price",checkIsUserAuthenticated,proController.fetchPrice);
router.get("/fetch/rating",checkIsUserAuthenticated,proController.fetchRating);







export default router; 