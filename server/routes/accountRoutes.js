import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";

import "../config/passport.js";
import pool from "../config/db.js";
import { checkAuth } from "../middlewares/authController.js";

import { generateNewUniqueIdentifier } from "../utils/helper.js";

const saltRounds = 10;
const router = express.Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", info: info });
    }
    req.login(user, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json({ message: "Login successful", user: user });
    });
  })(req, res, next);
});

router.post("/register", async (req, res) => {
  const { fName, lName, username, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      console.log(result.rows);
      res.status(400).json({ message: "Email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const userId = await generateNewUniqueIdentifier(fName, lName);
      const insertedResult = await pool.query(
        "INSERT INTO users (fName, lName, email, password, created_at, userId, userRole) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [
          fName,
          lName,
          username,
          hashedPassword,
          new Date().toISOString(),
          userId,
          "student",
        ]
      );
      const user = insertedResult.rows[0];
      req.login(user, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "User Creation Failed" });
        } else {
          res.status(200).json({ message: "Account registered successful!" });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User Creation Failed" });
  }
});

router.put("/reset-password", async (req, res) => {
  const { currentPassword, password, userid } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE userid = ($1)", [
      userid,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid old password" });
      }
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await pool.query("UPDATE users SET password = ($1) WHERE userid = ($2)", [
        hashedPassword,
        userid,
      ]);
    } else {
      res.status(400).json({ message: "User ID does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Reset Password Failed" });
  }
});

router.put("/update-user", checkAuth, async (req, res) => {
  const { fName, lName, username, userid } = req.body;
  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE userid = $1",
      [userid]
    );

    if (userResult.rows.length > 0) {
      const emailCheckResult = await pool.query(
        "SELECT * FROM users WHERE email = $1 AND userid != $2",
        [username, userid]
      );

      if (emailCheckResult.rows.length > 0) {
        return res
          .status(400)
          .json({ message: "Email already in use by another user" });
      }
      await pool.query(
        "UPDATE users SET fName = $1, lName = $2, email = $3 WHERE userid = $4",
        [fName, lName, username, userid]
      );
      const updatedUserResult = await pool.query(
        "SELECT * FROM users WHERE userid = $1",
        [userid]
      );

      res.status(200).json({
        message: "Update successful!",
        user: updatedUserResult.rows[0],
      });
    } else {
      res.status(400).json({ message: "User ID does not exist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update Failed" });
  }
});

export default router;
