const mongoose = require('mongoose');
const Project = require('./models/Project');
const Client = require('./models/Client');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const projects = await Project.find().sort({ _id: -1 }).limit(3);
        console.log('--- Latest Projects ---');
        console.log(projects);

        const clients = await Client.find().sort({ _id: -1 }).limit(3);
        console.log('--- Latest Clients ---');
        console.log(clients);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkDB();
