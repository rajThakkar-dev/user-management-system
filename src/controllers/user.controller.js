const User = require("../models/User");

exports.getMe = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
};

exports.getUsers = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const users = await User.find()
        .select("-password")
        .skip((page - 1) * 10)
        .limit(10);
    res.json(users);
};

exports.toggleStatus = async (req, res) => {
    const user = await User.findById(req.params.id);
    user.status = user.status === "active" ? "inactive" : "active";
    await user.save();
    res.json({ status: user.status });
};
