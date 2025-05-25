const mongoose = require('mongoose');

// Define the User schema with validation and timestamps
const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    displayName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt
});

// Export the model for Passport to manage Google sign-ins
module.exports = mongoose.model('User', UserSchema);
