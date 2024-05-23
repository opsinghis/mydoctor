import express from "express";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/index.js";
// controller
import {
  currentAdmin,
  listUsers,
  refreshUserStatus,
  allIssues,
  removeIssue,
} from "../controllers/admin.js";

router.get("/current-admin", requireSignin, currentAdmin);
router.get("/admin/users", requireSignin, isAdmin, listUsers);
router.post(
  "/admin/refresh-user-status",
  requireSignin,
  isAdmin,
  refreshUserStatus
);
// help and support
router.delete(
  "/admin/issue/delete/:issueId",
  requireSignin,
  isAdmin,
  removeIssue
);
router.get("/admin/issues", requireSignin, isAdmin, allIssues);

//module.exports = router;
export default router;
