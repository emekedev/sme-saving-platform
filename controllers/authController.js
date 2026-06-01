import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler"
import validator from "validator"


// REGISTER USER
const registerUser = asyncHandler (async (req, res) => {
    const {
      fullName,
      businessName,
      phone,
      email,
      password,
      role,
    } = req.body;

    if (
  !fullName ||
  !businessName ||
  !phone ||
  !email ||
  !password
) {
  res.status(400);

  throw new Error("Please fill all fields");
}

if (password.length < 6) {
  res.status(400);

  throw new Error(
    "Password must be at least 6 characters"
  );
}

if (!validator.isEmail(email)) {
  res.status(400);

  throw new Error("Invalid email format");
}

    // CHECK IF USER EXISTS
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // CREATE USER
    const user = await User.create({
      fullName,
      businessName,
      phone,
      email,
      password: hashedPassword,
      role,
    });

    // RESPONSE
    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        businessName: user.businessName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({
        message: "Invalid user data",
      });
    }
   
});

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // FIND USER
    const user = await User.findOne({ email });

    // CHECK USER + PASSWORD
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        businessName: user.businessName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
};

const smeDashboard = async (req, res) => {
  res.status(200).json({
    message: `Welcome SME ${req.user.fullName}`,
  });
};

const agentDashboard = async (req, res) => {
  res.status(200).json({
    message: `Welcome Agent ${req.user.fullName}`,
  });
};

const logoutUser = asyncHandler (async (req,res)=> {
  res.status(200).json({
    message: "user logged out successfully",
  });
})

export { registerUser, loginUser, getUserProfile, smeDashboard, agentDashboard, logoutUser,};