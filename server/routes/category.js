import express from "express";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/index.js";
// controller
import {
  create,
  read,
  update,
  remove,
  categories,
} from "../controllers/category.js";

router.post("/category", requireSignin, isAdmin, create);
router.get("/category", read);
router.put("/category/:slug", requireSignin, isAdmin, update);
router.delete("/category/:slug", requireSignin, isAdmin, remove);
router.get("/categories", categories);

//module.exports = router;
export default router;
