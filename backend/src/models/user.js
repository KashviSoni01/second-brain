const mongoose= require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 8
    },

    password: {
        type: String,
        required: true,
        minLength: 3
    }
}, {timestamps: true})

const User=mongoose.model('User', userSchema)

module.exports = User;

