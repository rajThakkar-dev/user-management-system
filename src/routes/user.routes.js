const router = require("express").Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const {
    getMe,
    getUsers,
    toggleStatus
} = require("../controllers/user.controller");

router.get("/me", auth, getMe);
router.get("/", auth, role("admin"), getUsers);
router.patch("/:id/status", auth, role("admin"), toggleStatus);

module.exports = router;
