import express from "express";
const router = express.Router();
import nusretController from "./controller/nusret.controller";

router.get("/", nusretController.goHome);

router.get("/login", nusretController.getLogin);
router.post("/login", nusretController.login);


router.get("/signup", nusretController.getSignup);   // ← to‘g‘ri nomlar
router.post("/signup", nusretController.signup);

export default router;
