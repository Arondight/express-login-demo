import express from "express";
import logged from "#src/api/middlewares/user/logged";
import login from "#src/api/middlewares/user/login";
import register from "#src/api/middlewares/user/register";
import remove from "#src/api/middlewares/user/remove";
import session from "#src/api/middlewares/user/session";
import users from "#src/api/middlewares/user/users";

const router = express.Router();

router.get("/session/get", logged.yes, session.get);
router.get("/session/remove", logged.yes, session.remove);
router.get("/users", logged.yes, users);
router.post("/login", logged.no, login);
router.post("/register", logged.no, register);
router.post("/remove", logged.yes, remove);

export default router;
