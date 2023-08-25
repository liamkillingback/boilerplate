import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  console.log("register path reached")
  // res.status(200).json({message: "register path success"});
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    console.log(req.body);
    console.log(passwordHash);
    const isExistingUsername = await User.findOne({ username: username });
    if (isExistingUsername) {
      res
        .status(400)
        .json({ message: "user already exists with that username" });
      return;
    }
    const newUser = User({
      username,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
export const login = async (req, res) => {
  console.log("hi")
  // console.log("login path reached");
  // res.status(200).json({ message: "login path success" });
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) return res.status(400).json({ message: "User does not exist" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
