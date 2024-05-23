import express from "express";

const router = express.Router();

// middlewares
import { requireSignin } from "../middlewares/index.js";
// controller
import { makeAuthor, currentAuthor } from "../controllers/author.js";

router.post("/make-author", requireSignin, makeAuthor);
router.get("/current-author", requireSignin, currentAuthor);

//module.exports = router;
export default router;
