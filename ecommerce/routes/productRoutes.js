import express from "express";
import {
    createProductController,
    getProductController,
    singleProductController,
    getProductPhotoController,
    deleteProductController,
    updateProductController,
    productFilterController,
    productCountController,
    productListController,
    searchProductController,
    similarProductController
} from "../controller/productController.js";
import formidable from 'express-formidable' //this is a middleware

//import { signIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add-product", formidable(), createProductController);
router.get("/product", getProductController);
router.get("/single-product/:_id", formidable(), singleProductController);

//get photo controller
router.get('/product-photo/:_id', getProductPhotoController)

//update product
router.put("/update-product/:_id", formidable(), updateProductController)

//delete controller
router.delete('/delete-product/:_id', deleteProductController)

//filter product
router.post("/product-filter", productFilterController);

//product count
router.get("/product-count", productCountController
)

//product  list
router.get("/product-list/:page", productListController)
// search products

router.get("/search-product/:keyword", searchProductController);

//search  similar product
//router.get("/similar-product/:pid/:cid", searchProductController);

export default router;
