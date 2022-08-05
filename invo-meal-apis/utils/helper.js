const jwt = require("jsonwebtoken");

exports.generateWebToken = (data) => {
  return jwt.sign(
    {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
    },
    process.env.JWT_KEY,
    { expiresIn: "30d" },
  );
};
