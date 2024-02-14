import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

// Method: Compare user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// before(pre) we save, Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {     // 'password' is the form field data
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);     // set the hashed password
});

const User = mongoose.model('User', userSchema);

export default User;