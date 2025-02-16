import express from "express";
import UserController from "../controllers/userController";

const router = express.Router();

router.get("/", UserController.getUser);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;
