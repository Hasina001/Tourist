const express = require('express')
const router = express.Router()
const User = require('../model/user.model')

//register a user
router.post('/register', async (req, res) => {
    try {
        const {email, password, username} = req.body
        const user = new User({email, password, username})
        await user.save()

        res.status(200).send({message: 'Registration successfully', user:user})
    } catch (error) {
        console.error('Failed to regoster', error)
        res.status(500).json({message: 'Failed to register'})
    }
})

//login a user
router.post('/login', async (req,res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).send({message: 'User not found'})
        }

        const isMacth = await User.comparePassword({password})
        if(!isMatch) {
            return res.status(404).send({message: 'Invalid password'})
        }

        //generate token here

        res.status(200).send({message: 'Login successfully', token, user: {
            _id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
        }})

    } catch (error) {
        console.error('Failed to login', error)
        res.status(500).json({message: 'Failed to login'})
    }
})

module.exports = router