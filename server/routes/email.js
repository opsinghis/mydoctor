import express from "express";

const router = express.Router();

// middlewares
import { requireSignin } from "../middlewares/index.js";
// controller
import { supportEmail } from "../controllers/email.js";

router.post("/contact-support", requireSignin, supportEmail);

//module.exports = router;
export default router;