import { Router } from "express";
import {
	register,
	login,
	getUser,
	deleteUser,
	refreshToken,
	chechUserAuth,
	logout,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router: Router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", authMiddleware, logout);
router.post("/check-auth", authMiddleware, chechUserAuth);

router.get("/me", authMiddleware, getUser);
router.post("/me/delete-account", authMiddleware, deleteUser);

export default router;
