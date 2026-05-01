import { Router } from "express";
import { createComment, deleteComment } from "../controllers/commenControllers";
import { requireAuth } from "@clerk/express";

const router = Router();

/**
 * @route   POST /api/comments/:productId
 * @desc    Create a new comment for a product
 * @access  Private (Requires Authentication)
 */
router.post("/:productId", requireAuth(), createComment);

/**
@route DELETE /api/comments/:commentId
@desc Delete an existing comment
@access Private (Requires Authentication)
*/
router.delete("/:commentId", requireAuth(), deleteComment);

export default router;