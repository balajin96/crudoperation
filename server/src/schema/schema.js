import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Signup',
        required: true,
    },
}, { timestamps: true })

export const User = mongoose.model("User", userSchema);
// export const Product = mongoose.model("Product", productSchema);


const singupSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true })

export const Signup = mongoose.model("Signup", singupSchema);