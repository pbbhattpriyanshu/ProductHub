import { Router } from "express";
import { 
    getAllProducts, 
    getMyProducts, 
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productcontroller";
import { requireAuth } from "@clerk/express";

const router = Router();

// ==========================================
// PUBLIC ROUTES
// ==========================================

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get("/", getAllProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get a single product by its ID
 * @access  Public
 */
router.get("/:id", getProductById);

// ==========================================
// PROTECTED ROUTES (Requires Authentication)
// ==========================================

/**
 * @route   GET /api/products/my
 * @desc    Get products created by the current user
 * @access  Private
 */
router.get("/my", requireAuth(), getMyProducts);

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private
 */
router.post("/", requireAuth(), createProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product (must be owner)
 * @access  Private
 */
router.put("/:id", requireAuth(), updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product (must be owner)
 * @access  Private
 */
router.delete("/:id", requireAuth(), deleteProduct);

export default router;