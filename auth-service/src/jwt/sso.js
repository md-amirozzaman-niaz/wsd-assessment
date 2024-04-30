const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign(
    { userId: user.id, role: "admin" },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_TOKEN_TTL,
    }
  );
}

function generateRefreshToken(user, jti) {
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_TTL,
    }
  );
}

function generateTokens(user, jti) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
};
