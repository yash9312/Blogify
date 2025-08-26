const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// Create JWT token for a user
function createTokenForUser(user) {
  const paylod = {
    id: user._id,
    name: user.fullName,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };

  const token = JWT.sign(paylod, JWT_SECRET);
  return token;
}

// Validate token and return payload
function validateToken(token) {
  const paylod = JWT.verify(token, JWT_SECRET);
  return paylod;
}

module.exports = {
  createTokenForUser,
  validateToken
};
