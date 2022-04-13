import express from "express";
import { user } from "#@src/api/middleware";

const router = express.Router();

router.get("/session/get", user.logged.yes, user.session.get);
router.get("/session/remove", user.logged.yes, user.session.remove);
router.get("/users", user.logged.no, user.users);
router.post("/login", user.logged.no, user.login);
router.post("/register", user.logged.no, user.register);
router.post("/remove", user.logged.yes, user.remove);

export default router;
