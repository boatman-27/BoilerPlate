import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import pool from "./db.js";

passport.use(
  new Strategy(async function verify(username, password, done) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [username]
      );
      if (rows.length === 0) {
        return done(null, false, { message: "Incorrect email." });
      } else {
        const user = rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          done(null, user);
        } else {
          done(null, false, { message: "Incorrect password." });
        }
      }
    } catch (error) {
      console.log(error);
      done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (rows.length > 0) {
      done(null, rows[0]);
    } else {
      done(new Error("User not found"), null);
    }
  } catch (error) {
    console.log(error);
    done(error, null);
  }
});
