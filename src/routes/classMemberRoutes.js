const express = require("express");
const router = express.Router();
const {
  getMembers,
  getDashboardStats,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
} = require("../controllers/classMemberController");

// WICHTIG: Die statische Route /dashboard MUSS vor der dynamischen Route /:id stehen,
// da Express sonst den String "dashboard" fälschlicherweise als ID interpretieren würde.
router.get("/dashboard", getDashboardStats);

router.get("/", getMembers);
router.get("/:id", getMemberById);
router.post("/", createMember);
router.put("/:id", updateMember);
router.delete("/:id", deleteMember);

module.exports = router;
