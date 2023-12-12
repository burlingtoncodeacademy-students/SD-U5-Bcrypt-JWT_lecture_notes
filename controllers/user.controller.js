const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT;

// const testingBcrypt = password => {
//     let encrypt = bcrypt.hashSync(password, 10);
//     console.log("ENCRYPT: ", encrypt)
// }

//! Signup
router.post('/signup', async (req, res) => {

    // testingBcrypt('password');
    // testingBcrypt('password');
    // testingBcrypt('NEWpassword');

    try {

        const user = new User({
            firstName: req.body.first,
            lastName: req.body.last,
            email: req.body.email,
            // password: req.body.password
            password: bcrypt.hashSync(req.body.password, 13) // passing in the password provided by the client, salting 13 times.
        });

        const newUser = await user.save();

        // const token = jwt.sign({id: newUser._id}, "My Secret Passcode", {expiresIn: "1 day"});
        const token = jwt.sign({id: newUser._id}, SECRET, {expiresIn: "1 day"});

        res.status(200).json({
            user: newUser,
            message: "Success",
            token
        })

    } catch (err) {
        res.status(500).json({
            ERROR: err.message
        })
    }
});

//! Login
router.post('/login', async (req, res) => {
    try {

        //1. Capture data provided by user (body).
        const { email, password } = req.body;

        //2. Check database to see if email supplied exists
        const user = await User.findOne({email: email});
        //* A MongoDB method that accepts a query as an argument. Returns an instance of a document that matches.

        // console.log(user);
        if(!user) throw new Error('Email or Password does not match.');
        
        //3. If email exists, consider if password matches.
        const passwordMatch = await bcrypt.compare(password, user.password);
        //* compare(string, hashed);
        // console.log(passwordMatch);
        if(!passwordMatch) throw new Error('Email or Password does not match.');

        //4. After verified, provide a jwt token
        const token = jwt.sign({id: user._id}, SECRET, {expiresIn: 60 * 60 * 12});

        //5. response status returned
        res.status(200).json({
            message: "Logged in!",
            user,
            token
        })


    } catch (err) {
        res.status(500).json({
            ERROR: err.message
        })
    }
})

module.exports = router;