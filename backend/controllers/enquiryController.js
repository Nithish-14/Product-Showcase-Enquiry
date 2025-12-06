const pool = require("../db/mysql");

exports.createEnquiry = async (req, res) => {
  try {
    const { product_id, name, email, phone, message } = req.body;

    await pool.query(
      "INSERT INTO enquiries (product_id, name, email, phone, message) VALUES (?, ?, ?, ?, ?)",
      [product_id, name, email, phone, message]
    );

    res.json({ success: true, message: "Enquiry submitted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getEnquiries = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM enquiries ORDER BY created_at DESC"
    );
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
