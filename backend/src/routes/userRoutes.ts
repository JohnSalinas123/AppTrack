import { Router } from "express";
import {
	register,
	login,
	getUser,
	deleteUser,
	refreshToken,
	chechUserAuth,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router: Router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/check-auth", authMiddleware, chechUserAuth);
router.post("/refresh", authMiddleware, refreshToken);
router.get("/me", authMiddleware, getUser);
router.post("/me/delete-account", authMiddleware, deleteUser);

export default router;
