import { Router } from "express";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config()

const router = Router();

// Google OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
  res.redirect("/auth/dashboard");
});

router.get("/logout", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect("/");
  });
});

router.get("/dashboard", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("Welcome to the dashboard");
  } else {
    res.redirect("/auth/google");
  }
});

export default router;
