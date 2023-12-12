const router = require('express').Router();
const User = require('../models/user.model');

//! Signup
router.post('/signup', async(req,res) => {
    try {

        const user = new User({
            firstName: req.body.first,
            lastName: req.body.last,
            email: req.body.email,
            password: req.body.password
        });
        
        const newUser = await user.save();

        res.status(200).json({
            user: newUser,
            message: "Success"
        })

    } catch (err) {
        res.status(500).json({
            ERROR: err.message
        })
    }
});

//! Login
router.post('/login', async (req,res) => {
    try {
        
        //1. Capture data provided by user (body).

        //2. Check database to see if email supplied exists

        //3. If email exists, consider if email matches.

        //4. After verified, provide a jwt token

        //5. response status returned
        
        
    } catch (err) {
        res.status(500).json({
            ERROR: err.message
        })
    }
})

module.exports = router;