const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    mobileNumber: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
