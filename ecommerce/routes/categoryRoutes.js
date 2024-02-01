import express  from "express";
import { 
    createCategoryController, 
    deleteCategoryController,
    singleCategoryController,
     getCategoryController, 
     updateCategoryController ,
     searchProductController

    } from "../controller/categoryController.js";
import { searchProductController } from "../controller/productController.js";
const router=express.Router();

//create category post Route

router.post('/create-category',createCategoryController)

//get category post Route

router.get('/get-category',getCategoryController)

//get singlr category post Route

router.get('/get-single-category/:_id',singleCategoryController)


//delete category post Route

router.delete('/delete-category/:_id',deleteCategoryController)

//create category post Route

router.put('/update-category/:_id',updateCategoryController)





export default router;