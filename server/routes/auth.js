import express from "express";

const router = express.Router();

// middlewares
import { requireSignin } from "../middlewares/index.js";
// controllers
import {
  register,
  login,
  currentUser,
  logout,
  forgotPassword,
  resetPassword,
  registerActivate,
  registerwithoutemail,
} from "../controllers/auth.js";

router.post("/register", register);
router.post("/register-withoutemail" , registerwithoutemail);
router.post("/register-activate", registerActivate);
router.post("/login", login);

router.get("/current-user", requireSignin, currentUser);
router.get("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

//module.exports = router;
export default router;
