import { Router } from "express";
import { body, validationResult } from "express-validator";
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "./handlers/products";
import { getOneUpdate, getUpdates } from "./handlers/updates";
import { handleInputErrors } from "./modules/middleware";

const router = Router();
/**
 * Product
 */
router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

router.post("/product", 
  body('name').isString().isLength({max: 25}),
  handleInputErrors,
  createProduct
  );

router.put("/product/:id", 
  body('name').isString(), 
  handleInputErrors, 
  updateProduct
  );

router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", getUpdates);

router.get("/update/:id", getOneUpdate);

router.post("/update", 
  body('title').optional().isString(), 
  body('body').optional().isString(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(), 
  body('productId').isString(), 
  handleInputErrors, 
  
  (req, res) => {});

router.put("/update/:id", 
  body('title').optional().isString(), 
  body('body').optional().isString(), 
  
  (req, res) => {});

router.delete("/update/:id", (req, res) => {});

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => {});

router.get("/updatepoint/:id", (req, res) => {});

router.post("/updatepoint", 
  body('name').isString(),
  body('description').isString(), 
  body('updateId').exists().isString(),
  
  (req, res) => {});

router.put("/updatepoint/:id",   
  body('name').optional().isString(),
  body('description').optional().isString(),
  
  (req, res) => {});

router.delete("/updatepoint/:id", (req, res) => {});


export default router;