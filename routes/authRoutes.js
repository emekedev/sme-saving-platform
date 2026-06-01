import express from "express";
import { registerUser,loginUser, getUserProfile, smeDashboard, agentDashboard, logoutUser} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.get(
  "/sme-dashboard",
  protect,
  authorizeRoles("sme"),
  smeDashboard
);
router.get(
  "/agent-dashboard",
  protect,
  authorizeRoles("agent"),
  agentDashboard
);

router.post("/logout", logoutUser);

export default router;