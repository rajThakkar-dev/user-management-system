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

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { fullName, email } = req.body;

        if (!fullName || !email) {
            return res.status(400).json({ message: "Full name and email are required" });
        }

        // Check if email already exists
        const existingUser = await User.findOne({
            email,
            _id: { $ne: userId },
        });

        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { fullName, email },
            { new: true, runValidators: true }
        ).select("-password");

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update profile" });
    }
};

export const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findById(userId);

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to change password" });
    }
};