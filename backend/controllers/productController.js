const pool = require("../db/mysql");

exports.getProducts = async (req, res) => {
  try {
    const search = req.query.search || "";
    const category = req.query.category || "";
    const page = parseInt(req.query.page || "1");
    const limit = parseInt(req.query.limit || "10");
    const offset = (page - 1) * limit;

    let where = "WHERE 1=1 ";
    const params = [];

    if (search) {
      where += "AND (name LIKE ? OR short_desc LIKE ? OR long_desc LIKE ?) ";
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    if (category) {
      where += "AND category = ? ";
      params.push(category);
    }

    const [countRows] = await pool.query(
      `SELECT COUNT(*) AS total FROM products ${where}`,
      params
    );
    const total = countRows[0].total;

    const [rows] = await pool.query(
      `SELECT * FROM products ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({
      data: rows,
      pagination: { total, page, limit },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0) return res.status(404).json({ error: "Not found" });

    res.json({ data: rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
