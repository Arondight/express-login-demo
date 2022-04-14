import express from "express";
import { session, user } from "#@src/api/middleware";

const router = express.Router();

router.get("/", user.logged.yes, session.get);

export default router;
