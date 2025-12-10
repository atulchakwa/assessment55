const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String, // URL/Path to the image
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
