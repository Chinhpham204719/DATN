const User = require('../model/user');
const Device = require('../model/device');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const { rawListeners } = require('../model/device');

module.exports = {
// Function to handle user login
// Authenticates the user, generates an authentication token, and sends user and token details in the response
    login: async (req, res) => {
        //console.log(req.body)
        try {
            const user = await User.findByCredentials(req.body.username, req.body.password)
            const token = await user.generateAuthToken()
            res.status(200).send({user, token})
        } catch(e) {
            res.status(400).send(e)
        }
    },
  
// Function to handle user signup
// Creates a new user, checks for username/password validity, and sends user and token details in the response
    Signup: async (req, res) => {
        try {
            if (!req.body.username || !req.body.password){
                res.status(401).send({
                    error: "Invalid username or password."
                })
            }
            let existedUser = await User.findOne({username: req.body.username});
            if (existedUser) {
                res.status(401).send({
                    error: "The account already exists."
                })
            } else {
                console.log(req.body)
                const user = new User({
                    ...req.body,
                    role: "user",
                    _id: new mongoose.Types.ObjectId,
                })
                try {
                    try {
                        await user.save()
                    } catch (e) {
                        console.log(e)
                    }
                    const token = await user.generateAuthToken()
                    res.status(201).send({user, token})
                } catch (e) {
                    res.status(400).send(e)
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                error: "Internal Server Error!"
            })
        }
    },

// Function to handle user logout
// Removes the authentication token from the user and sends a successful logout response
    logout: async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token
            })
            await req.user.save()
    
            res.status(200).send("You have successfully logged out.")
    
        } catch (e) {
            res.status(500).send()
        }
    },

// Function to get all users
// Retrieves and sends a response with a list of all users
    getAllUser: async (req, res) => {
        console.log(req.user)
        let users = await User.find();
        if (users)
            res.status(200).send({users})
        else if (users.length === 0)
            res.status(404).send({
                error: "Can't found."
            })
    },

// Function to get a user and their associated devices by 'userId'
// Retrieves and sends a response with user and associated devices
    getUserAndDevices: async (req, res) => {
        try {
            let user = await User.findById(req.params.userId);
            if (!user) {
                res.send({
                    error: "User does not exist."
                })
            } else {
                devices = await Device.find({userId: req.params.userId})
                res.send({
                    user: user,
                    devices: devices
                })
            }
        } catch (error) {
            res.status(500).send({
                success: false,
                error: "Internal Server Error!"
            })
        }
    },

// Function to get the current authenticated user
// Retrieves and sends a response with the current authenticated user
    getCurrentUser: async (req, res) => {
        try {
            let user = req.user
            res.send(user)
        } catch (error) {
            res.status(500).send({
                success: false,
                error: "Internal Server Error!"
            })
        }
    }
}
