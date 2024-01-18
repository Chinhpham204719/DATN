const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const UserSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    username: String,
    password: String,
    role: String,
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
})


// Method to generate an authentication token for the user
UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const secretKey = "iot2024"; 
    const token = jwt.sign({ _id: user._id.toString() }, secretKey);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

// Method to convert the user object to a JSON object, removing sensitive information
UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

// Static method to find a user by their credentials (username and password)
UserSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username: username });
    if (!user) {
        throw new Error('Unable to log in');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to log in');
    }

    return user;
}

// Pre-save middleware to hash the user's password before saving to the database
UserSchema.pre('save', async function (next) {
    const user = this;
    console.log('Before saving');
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
})

// Static method to check if a user with a specific username already exists
UserSchema.statics.checkExist = async (data) => {
    try {
        let user = await this.findOne({ username: data.username });
        return !!(user);
    } catch (error) {
        console.log('Error');
        throw error;
    }
}

const User = mongoose.model('User', UserSchema);
module.exports = User