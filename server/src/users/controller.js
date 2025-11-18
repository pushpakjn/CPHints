import pool from "../../db.js";
import bcrypt, { hash } from "bcrypt";
import * as queries from "./queries.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const getUsers = async (request, response) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    response.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    response.status(500).send("Server error");
  }
};

export const addUser = async (request, response) => {
  const { email, username } = request.body;
  console.log(request.body);

  try {
    const results = await pool.query(queries.checkAlreadyExists, [
      email,
      username,
    ]);

    if (results.rows.length > 0) {
      response.status(409).send("User already exists");
    } else {
      // generate a random 6 digit otp
      const otp = Math.floor(100000 + Math.random() * 900000);
      // send the otp to the user's email using sendgrid api
      const msg = {
        to: email,
        from: process.env.SENDGRID_EMAIL,
        subject: "OTP for CPhints",
        html: `The OTP for CPhints is ${otp}. OTPs are meant to be used only by the person they are intended for. Do not share your OTPs with anyone, even if they claim to be from a trusted source.`,
      };

      sgMail
        .send(msg)
        .then(() => {
          response.status(200).json({ otp });
        })
        .catch((error) => {
          // response.status(401).send("OTP error", error);
          response.status(401).json({ message: "OTP error", error });

        });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send("Server error");
  }
};

// login user by checking by both username and email
export const loginUser = async (request, response) => {
  const { id, password } = request.body;
  // check if id is email or username
  let email = id;
  let username = id;
  if (id?.includes("@")) {
    email = id;
    username = "@";
  } else {
    email = "c@p@";
    username = id;
  }

  try {
    const results = await pool.query(queries.checkAlreadyExists, [
      email,
      username,
    ]);

    if (results.rows.length > 0) {
      const user = results.rows[0];
      bcrypt.compare(password, user.password, function (err, res) {
        if (res) {
          const accessToken = jwt.sign(user, process.env.JWT_SECRET);
          response.status(200).json({ accessToken });
        } else {
          response.status(401).send("Invalid credentials");
        }
      });
    } else {
      response.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.log(error);
    response.status(500).send("Server error");
  }
};

export const addTemporaryHint = async (request, response) => {
  const { qlink, hints } = request.body;
  // padd hints array with undefined if length is less than 5
  if (hints.length < 5) {
    for (let i = hints.length; i < 5; i++) {
      hints.push(null);
    }
  }

  try {
    const result = await pool.query(queries.addHint, [
      hints[0],
      hints[1],
      hints[2],
      hints[3],
      hints[4],
    ]);
    response.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    response.status(500).send("Server error");
  }
};

export const addUserToDatabase = async (request, response) => {
  const { name, email, password, username } = request.body;
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const result = await pool.query(queries.addUser, [
      name,
      email,
      hashedPassword,
      username,
    ]);

    const accessToken = jwt.sign(result.rows[0], process.env.JWT_SECRET);
    response.status(201).json({ accessToken });
  } catch (error) {
    console.log(error);
    response.status(500).send("Server error");
  }
};
