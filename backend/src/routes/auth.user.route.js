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

//logout a user
router.post('/logout', async (req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).send({message: 'Logout successfully'})
    } catch (error) {
        console.error('Failed to logout', error)
        res.status(500).json({message: 'Failed to logout'})
    }
})

//Get a user
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, 'id email role')
        res.status(200).send({message: 'Fetching successfully', users})
    } catch (error) {
        console.error('Error fetching a user', error)
        res.status(500).json({message: 'Error fetching a user'})
    }
})

//delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findByIdAndDelete(id)

        if(!user){
            return res.status(404).send({message: 'User not found'})
        }

        res.status(200).send({message: 'User deleted successfully'})
    } catch (error) {
        console.error('Error deleting user', error)
        res.status(500).json({message: 'Error deleting a user'})
    }
})

//Update a user
user.put('/users/:id', async (req,res) => {
    try {
        const {id} = req.params
        const {role} = req.body
        const user = await User.findByIdAndUpdate(id, {role}, {new: true})

        if(!user){
            return res.status(404).send({message: 'User not found'})
        }

        res.status(200).send({message: 'User role updated successfully !', user})
    } catch (error) {
        console.error('Error updating a user', error)
        res.status(500).json({message: 'Error updating a user'})
    }
})

module.exports = router