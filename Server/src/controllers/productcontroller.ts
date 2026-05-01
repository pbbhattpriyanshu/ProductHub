import { request, Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as queries from "../db/queries";

/**
 * Retrieves all products from the database.
 * @route GET /api/products
 * @access Public
 */
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await queries.getAllProducts();
        res.status(200).json({ products });
    } catch (error) {
        console.log("error in fetching products", error);
        res.status(500).json({ message: "Failed to get products" });
    }
};

/**
 * Retrieves a single product by its unique ID.
 * @route GET /api/products/:id
 * @access Public
 */
export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const product = await queries.getProductById(id);

        if (!product) return res.status(400).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        console.log("error in fetching single product");
        res.status(500).json({ message: "Failed to get product" })
    }
};

/**
 * Retrieves all products created by the currently authenticated user.
 * @route GET /api/products/my
 * @access Private (Requires Authentication)
 */
export const getMyProducts = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const products = await queries.getProductsByUserId(userId);
        if (!products) return res.status(401).json({ message: "No Product Found" });

        res.status(200).json(products);

    } catch (error) {
        console.log("Error in Fetching User Products");
        res.status(500).json({ message: "Failed to get user products" })
    }
};

/**
 * Creates a new product for the authenticated user.
 * @route POST /api/products
 * @access Private (Requires Authentication)
 */
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const { title, description, imageUrl } = req.body;
        if (!title || !description || !imageUrl) {
            return res.status(401).json({ error: "Title, description and imageUrl are required" })
        }

        const product = await queries.createProduct({
            title,
            description,
            imageUrl,
            userId
        });

        res.status(201).json({ message: "Product Successfully Created", product })
    } catch (error) {
        console.log("Error in Creating Product", error);
        res.status(500).json({ message: "Failed to create product" })
    }
};

/**
 * Updates an existing product. Only the product owner can update it.
 * @route PUT /api/products/:id
 * @access Private (Requires Authentication)
 */
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const id = req.params.id as string;
        const { title, description, imageUrl } = req.body;

        // Check if product exists and belongs to user
        const existingProduct = await queries.getProductById(id);
        if (!existingProduct) {
            res.status(404).json({ error: "Product not found" });
            return;
        }

        if (existingProduct.userId !== userId) {
            res.status(403).json({ error: "You can only update your own products" });
            return;
        }

        const product = await queries.updateProduct(id, {
            title,
            description,
            imageUrl,
        });

        res.status(200).json({ message: "Product Update Successfully", product})
    } catch (error) {
        console.log("Error in Update Product", error)
        res.status(500).json({ message: "Failed to Update product" })
    }
};

/**
 * Deletes an existing product. Only the product owner can delete it.
 * @route DELETE /api/products/:id
 * @access Private (Requires Authentication)
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const id  = req.params.id as string;

    // Check if product exists and belongs to user
    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    if (existingProduct.userId !== userId) {
      res.status(403).json({ error: "You can only delete your own products" });
      return;
    }

    await queries.deleteProduct(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};