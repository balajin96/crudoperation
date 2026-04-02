import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }
}, { timestamps: true })

// module.exports = mongoose.model('User', userSchema)
// export default mongoose.model('User', userSchema)

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