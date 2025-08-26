const { validateToken } = require("../Services/Auth");

// Middleware to check and validate auth token from cookies
function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) return next();

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {
      console.error("Token validation error:", error.message);
    }

    next();
  };
}

module.exports = { checkForAuthenticationCookie };
