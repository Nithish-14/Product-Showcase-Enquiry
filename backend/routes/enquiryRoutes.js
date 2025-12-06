const router = require("express").Router();
const {
  createEnquiry,
  getEnquiries,
} = require("../controllers/enquiryController");
const { authAdmin } = require("../middleware/authMiddleware");

router.post("/", createEnquiry);
router.get("/", authAdmin, getEnquiries);

module.exports = router;
