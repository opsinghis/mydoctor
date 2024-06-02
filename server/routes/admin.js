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
  makeAdmin,
  removeAdmin,
} from "../controllers/admin.js";

router.get("/current-admin", requireSignin, currentAdmin);
router.get("/admin/users", requireSignin, listUsers);
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

router.get("/admin/make-admin", requireSignin, makeAdmin);
router.get("/admin/remove-admin", requireSignin, isAdmin, removeAdmin);

//module.exports = router;
export default router;
