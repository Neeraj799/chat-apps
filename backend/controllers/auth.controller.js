import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import envConfig from "../config/envConfig.js";
import { userSignUpValidation } from "../helpers/authValidation.js";

const signup = async (req, res) => {
  try {
    const { error } = userSignUpValidation.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      console.log(error);
      return res.status(403).json({ error: error.details });
    }
    const { fullName, username, email, password, confirmPassword, gender } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password does not match" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await User({
      fullName,
      username,
      email,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.email, userId: user._id },
      envConfig.general.APP_KEY,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "User login successfully",
      success: true,
      token,
      email,
      id: user._id,
      name: user.fullName,
      profilePic: user.profilePic,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { login, signup };
