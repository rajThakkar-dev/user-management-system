const router = require("express").Router();
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const {
    getMe,
    getUsers,
    toggleStatus,
    changePassword,
    updateProfile
} = require("../controllers/user.controller");

router.get("/me", auth, getMe);
router.get("/", auth, role("admin"), getUsers);
router.patch("/:id/status", auth, role("admin"), toggleStatus);
router.put("/me", auth, updateProfile);
router.put("/me/password", auth, changePassword);


module.exports = router;
