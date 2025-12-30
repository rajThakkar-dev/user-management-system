const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const tokenGen = (user) =>
    jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });

exports.signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email, password: hashed });
    res.status(201).json({ token: tokenGen(user) });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    user.lastLogin = new Date();
    await user.save();

    res.json({ token: tokenGen(user) });
};
