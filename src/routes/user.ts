import express from "express";
import { makeNewUserAccount } from "../controllers/user";

const router = express.Router();

router.post("", makeNewUserAccount);

export default router;
