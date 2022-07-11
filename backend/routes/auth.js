const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/userData")

const JWT_SECRET = "M0h!tMehr@isG0od"



// ROute -1 Creating a user and validating a user
router.post(
    "/createuser",
    [
        body("email", "Enter a valid Email Address").isEmail(),
        body("name", "name should conatain at least 5 characters").isLength({
            min: 5,
        }),
        body("password", "Password should conatain at least 5 characters").isLength(
            { min: 5 }
        ),
    ],
    async (req, res) => {
        let success = false;
        //checking validation result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            //checking if user is already existing
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(200).json({ errors: "Email already registered" });
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            //create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });

            const data = {
                user: user.id
            }
            success = true;
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ success , authToken });
        } catch (error) {
            console.log("server Error");
            return res.status(500).json("Server Error");

        }
    }
);


// ROute -2 Login a user and validating a user
router.post(
    "/login",
    [
        body("email", "Enter a valid Email Address").isEmail(),
        body("password", "Password cannot be blank").exists(),
    ],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json("empty Credentials , Try again");
        }

        const { email, password } = req.body;

        try {

            let user = await User.findOne({ email })
            
            if (!user) {
                return res.status(400).json( success ,"Wrong user , Try again");
            }
            let passwordCompare = await bcrypt.compare(password, user.password)
            if (!passwordCompare) {
                return res.status(400).json(success , "Wrong pass , Try again");
            }

            
            const data = {
                user: user.id
            }
            console.log(data)
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true

            res.json({success ,  authToken });

        } catch (error) {
            console.log("server Error " + error);
            return res.status(500).json("Server Error");
        }

    })



// ROute -3 get a user Data
router.post("/getuser", fetchUser, async (req, res) => {
    try {
        let userId = req.user
       
        console.log(userId)
        const user = await User.findById(userId).select("-password");
            res.send(user);
    } catch (error) {
        console.log("server Error " + error.message);
            return res.status(500).json("Server Error");
    }
})

module.exports = router;
