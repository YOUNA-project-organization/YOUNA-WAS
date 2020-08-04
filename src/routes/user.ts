import express from "express";
import { makeNewUserAccount, loginUser } from "../controllers/user";

const router = express.Router();

router.post("", makeNewUserAccount);
router.post("/login", loginUser);

export default router;
