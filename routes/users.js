const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User"); // Make sure the path is correct

router.get("/", (req, res) => {
    res.send("Hello World");
});

// Update user
router.put("/:id", async (req, res) => {
    console.log("Received request body:", req.body);
    try {
        if (req.body.userID === req.params.id || req.user.isAdmin) {
            if (req.body.password) {
                try {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, salt); 
                } catch (err) {
                    return res.status(500).json("Password hashing error");
                }
            }

            try {
                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                });
                res.status(200).json("Account updated");
            } catch (err) {
                return res.status(500).json(err);
            }
        } else {
            return res.status(403).json("You can only update your own account or you are an admin");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});
  



module.exports = router