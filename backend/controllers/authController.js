const pool = require("../db/mysql");
const bcrypt = require("bcryptjs");
const { sign } = require("../utils/jwt");

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query("SELECT * FROM admin WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0)
      return res.status(404).json({ error: "Admin not found" });

    const admin = rows[0];

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return res.status(401).json({ error: "Wrong password" });

    const token = sign({ id: admin.id, email: admin.email });
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};
