"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuth = exports.getMe = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = require("../utils/generateToken");
const google_auth_library_1 = require("google-auth-library");
const googleClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: "Name, email, and password are required" });
            return;
        }
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Email already registered" });
            return;
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        const newUser = await User_1.default.create({
            name,
            email,
            password: hashedPassword,
            role: "customer",
        });
        const token = (0, generateToken_1.generateToken)({
            id: newUser._id.toString(),
            email: newUser.email,
            role: newUser.role,
        });
        res.status(201).json({
            message: "Registered successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during registration" });
    }
};
exports.registerUser = registerUser;
// @desc    Login existing user
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        const user = await User_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        const token = (0, generateToken_1.generateToken)({
            id: user._id.toString(),
            email: user.email,
            role: user.role,
        });
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during login" });
    }
};
exports.loginUser = loginUser;
// @desc    Get logged-in user's own profile
// @route   GET /api/auth/me
const getMe = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user?.id).select("-password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error fetching profile" });
    }
};
exports.getMe = getMe;
// @desc    Login or register via Google
// @route   POST /api/auth/google
const googleAuth = async (req, res) => {
    try {
        const { credential } = req.body;
        if (!credential) {
            res.status(400).json({ message: "Google credential is required" });
            return;
        }
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            res.status(401).json({ message: "Invalid Google token" });
            return;
        }
        let user = await User_1.default.findOne({ email: payload.email });
        if (!user) {
            // Create a new user with a random unusable password
            // (they will always log in via Google, never via password)
            const randomPassword = await bcryptjs_1.default.hash(payload.email + Date.now().toString(), 10);
            user = await User_1.default.create({
                name: payload.name || "Google User",
                email: payload.email,
                password: randomPassword,
                role: "customer",
                photoURL: payload.picture || "",
            });
        }
        const token = (0, generateToken_1.generateToken)({
            id: user._id.toString(),
            email: user.email,
            role: user.role,
        });
        res.status(200).json({
            message: "Google login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during Google authentication" });
    }
};
exports.googleAuth = googleAuth;
