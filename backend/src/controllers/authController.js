const User = require("../models/user");
const bcrypt = require('bcrypt')



async function createUser(req, res) {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        })
    }

    try {
        const existingUser = await User.findOne({ username })

        if (existingUser) {
            return res.status(403).json({
                message: "Username is taken"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: username,
            password: hashedPassword
        })

        req.session.userId = newUser._id

        req.session.save((err) => {
            if (err) {
                return res.status(500).json({ message: "Session save failed" })
            }

            res.status(200).json({
                message: "User signed up & logged in",
                userId: newUser._id
            })
        })


    } catch (e) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }

}

async function login(req, res) {
    const username = req.body.username
    const password = req.body.password
    console.log("in login");

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" })
    }

    const existingUser = await User.findOne({ username })
    if (!existingUser) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    const isPassword = await bcrypt.compare(password, existingUser.password)
    if (!isPassword) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    
    req.session.userId = existingUser._id

    
    req.session.save((err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: "Session save failed" })
        }

        console.log("Session saved:", req.session)

        res.json({ message: "Login Successful" })
    })
}


module.exports = { createUser, login }
