import { Router } from "express";
import User from "../models/user";
import dotenv from "dotenv";

dotenv.config()

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { email, googleId} = req.body;

        let user = await User.findOne({ where: { googleId: googleId } });

        if (!user) {
            user = await User.create({
                email: email,
                googleId: googleId,
            });
        }

        res.status(201).send(user);
    } catch (err) {
        res.status(400).send({"Error": "An unexpected error occurred while creating a new user."})
    }
});

export default router;