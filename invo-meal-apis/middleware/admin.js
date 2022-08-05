const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  const header = req.get("Authorization");
  if (!header) {
    res.status(401).json({ status: false, msg: "Invalid token. 1" });
    return false;
  }
  const token = header.split(" ")[1] ?? "";
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_KEY);
  } catch (err) {
    res.status(401).json({ status: false, msg: "Invalid token." });
    return false;
  }
  if (!decodedToken) {
    res.status(401).json({ status: false, msg: "Invalid token." });
  } else if (decodedToken.role === "admin") {
    req.adminAuth = decodedToken;
    next();
  } else {
    res.status(401).json({ status: false, msg: "Sorry! You are not admin." });
    return false;
  }
};

module.exports = adminAuth;
