const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "Nomiisagoo$dboy";

// ROUTE-1 : Create a User using: POST "/api/auth/createuser". Does not require Authorization
router.post('/createuser', [
    body('name', "Enter a valid name").isLength({ min: 3, max: 30 }),
    body('email', "Enter a valid email").isEmail(),
    body('passward', 'Enter a valid passward').isLength({ min: 5, max: 15 }),
], async (req, res) => {
    // If there are errors, return Bad request and the errors array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // Check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Generate a Hash
        const secPass = await bcrypt.hash(req.body.passward, salt);
        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            passward: secPass,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken: authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE-2 : Authenticate a User using: POST "/api/auth/login". Does not require Authorization
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('passward', 'Passward can not be blank').exists(),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, passward } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }
        const passwardCompare = await bcrypt.compare(passward, user.passward);
        if (!passwardCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken: authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


// ROUTE-3 : Get loggedin user details using: POST "/api/auth/getuser".require Authorization
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-passward");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;