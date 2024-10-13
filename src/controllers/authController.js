import dotenv from "dotenv";
import { users } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../index.js";
import { eq } from "drizzle-orm";
dotenv.config({ path: "../../.env" });

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const saltRounds = 10;

  //I am not verifying the email but it can be done using any third party service.

  try {
    //hashing the password before storing in the databse:
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    //inserting the values in the database:
    const newUser = await db
      .insert(users)
      .values({
        username,
        email,
        password: hashedPassword,
      })
      .returning({
        userId: users.userId,
        email: users.email,
        username: users.username,
        createdAt: users.createdAt,
      });

    //creating a JWT token for the user:
    const payload = { userId: newUser[0].userId };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" } //setting the token validity for 5 hours
    );
    return res.status(201).json({
      data: newUser[0],
      token: token,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to create user!", error: err });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //flow:
  //1. fetch data from db using email? (if not found then return invalid email)
  //2. decrypt the password from db
  //3. match it with entered password (if matched return data with token and success message)
  //4. if not matched then give error saying invalid password.

  try {
    //fetching data from db:
    const user = await db.select().from(users).where(eq(users.email, email));
    //thowing error if user not found:
    if (user.length === 0) {
      throw new Error("Invalid Email!");
    }

    const userData = user[0];

    //decypt the password from db:
    const isPasswordMatched = bcrypt.compareSync(password, userData.password);
    if (!isPasswordMatched) {
      throw new Error("Inavlid Password!");
    }

    //else the password is valid so lets create the token for the user:
    const payload = { userId: userData.userId };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" } //setting the token validity for 5 hours
    );

    //now let's respond to the client with some details:
    return res.status(201).json({
      userId: userData.userId,
      username: userData.username,
      email: userData.email,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occured!", error: error.message });
  }
};
