const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    }
}, { timestamps: true });

module.exports = mongoose.model('Subscriber', SubscriberSchema);
