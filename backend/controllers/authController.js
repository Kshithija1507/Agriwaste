import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
  console.log("📩 Register request body:", req.body);
  try {
    const { username, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("⚠️ Registration failed: Email already in use ->", email);
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Password hashed for user:", username);

    const user = await User.create({ username, email, password: hashedPassword });
    console.log("✅ New user registered:", user);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    console.log("🎟️ JWT token generated for user:", user._id);

    res.json({ user: { id: user._id, username: user.username, email: user.email }, token });
  } catch (err) {
    console.error("❌ Error in registerUser:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  console.log("📩 Login request body:", req.body);
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log("⚠️ Login failed: No user with email", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔑 Password match result:", isMatch);

    if (!isMatch) {
      console.log("⚠️ Login failed: Incorrect password for", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    console.log("🎟️ JWT token generated for login:", user._id);

    res.json({ user: { id: user._id, username: user.username, email: user.email }, token });
  } catch (err) {
    console.error("❌ Error in loginUser:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get Logged in User
export const getMe = async (req, res) => {
  console.log("👤 Fetching logged-in user with ID:", req.user?.id);
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      console.log("⚠️ No user found for ID:", req.user.id);
      return res.status(404).json({ message: "User not found" });
    }
    console.log("✅ User data retrieved:", user);
    res.json({ user });
  } catch (err) {
    console.error("❌ Error in getMe:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout User
export const logoutUser = async (req, res) => {
  console.log("👋 User logged out");
  res.json({ message: "Logged out successfully" });
};
