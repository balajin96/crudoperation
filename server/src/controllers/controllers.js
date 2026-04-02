import { User, Signup } from "../schema/schema.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
    const { employeeName, company } = req.body;

    const newUser = new User({ employeeName, company });

    try {
        await newUser.save();
        return res.status(200).json({ message: " User data created successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error registered user", error: error.message })
    }

}

export const getUser = async (req, res) => {
    try {
        const users = await User.find();
        // console.log("⭐⭐⭐", users);
        return res.status(200).json({
            success: true,
            message: ` user data fetched successfully`,
            users
        })

    } catch (error) {

    }
}

export const updateUser = async (req, res) => {

    const { id } = req.params;
    const { employeeName, company } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { employeeName, company }, { returnDocument: "after" });
        return res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        return res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

export const deleteUser = async (req, res) => {

    const { id } = req.params;
    try {
        const deleteData = await User.findByIdAndDelete(id);
        return res.status(200).json({
            message: "server ✅: delete successfully",
            success: true,
            deleteData
        })
    } catch (error) {

        return res.status(500).json({ message: "Error updating user", error: error.message });
    }
}

export const signup = async (req, res) => {
    const { email, password } = req.body;

    const pswd = await bcrypt.hash(password, 10);

    if (!email.trim() || !password.trim()) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const signupUser = new Signup({ email, password: pswd });

    try {
        await signupUser.save();
        return res.status(200).json({ message: " User signup successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error registered user", error: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("💀💀💀", req.body);


    console.log({ email, password });

    const user = await Signup.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    console.log(user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("🦄🦄🦄", isPasswordValid);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1hr' });
    console.log("🎫", token);
    try {
        return res.status(200).json({ message: " Login successful", token });
    } catch (error) {
        return res.status(500).json({ message: "Error occurred while logging in", error: error.message });
    }
}