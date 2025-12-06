const { verify } = require("../utils/jwt");

function authAdmin(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Missing token" });

  const token = header.split(" ")[1];
  try {
    req.admin = verify(token);
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
}

module.exports = { authAdmin };
