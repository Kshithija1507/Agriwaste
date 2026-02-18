import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;
  console.log("📩 Incoming headers:", req.headers);

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("🔑 Extracted token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Decoded JWT payload:", decoded);

      req.user = await User.findById(decoded.id).select("-password");
      console.log("👤 Authenticated user:", req.user);

      return next();
    } catch (err) {
      console.error("❌ Invalid token:", err.message);
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  console.warn("⚠️ No token provided in request headers");
  return res.status(401).json({ message: "Not authorized, no token" });
};

export default protect;
