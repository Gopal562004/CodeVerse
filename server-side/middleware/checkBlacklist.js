const Blacklist = require("./models/Blacklist"); // Adjust path as necessary

const checkBlacklist = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from header

  if (token) {
    const isBlacklisted = await Blacklist.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ error: "Token is invalidated" });
    }
  }

  next();
};
