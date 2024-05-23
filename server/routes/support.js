import express from "express";

const router = express.Router();

// middlewares
import { requireSignin } from "../middlewares/index.js";
// controller
import { issues, markResolved, removeIssue } from "../controllers/support.js";

router.get("/user/issues", requireSignin, issues);
router.put("/user/issue/mark-resolved", requireSignin, markResolved);
router.delete("/user/issue/delete/:issueId", requireSignin, removeIssue);

//module.exports = router;
export default router;
