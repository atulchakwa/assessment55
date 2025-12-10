const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const Client = require('./models/Client');
const Contact = require('./models/Contact');
const Subscriber = require('./models/Subscriber');

// Load env vars
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => console.error('MongoDB Connection Error:', err));

const seedData = async () => {
    try {
        // Clear existing data
        await Project.deleteMany({});
        await Client.deleteMany({});
        await Contact.deleteMany({});
        await Subscriber.deleteMany({});
        console.log('Cleared existing data.');

        // Projects
        const projects = [
            {
                name: 'Consultation',
                description: 'Expert consultation services to help you make informed decisions about your real estate investments. We analyze market trends and provide tailored advice.',
                image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=500&auto=format&fit=crop&q=60'
            },
            {
                name: 'Design',
                description: 'Innovative architectural and interior design solutions. We create spaces that functionality with aesthetic appeal, tailored to your lifestyle.',
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=60'
            },
            {
                name: 'Marketing & Design',
                description: 'Comprehensive marketing strategies coupled with stunning visual design to showcase your properties to the right audience effectively.',
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&auto=format&fit=crop&q=60'
            },
            {
                name: 'Consulting & Marketing',
                description: 'A hybrid approach combining strategic consulting with powerful marketing campaigns to maximize the value and visibility of your assets.',
                image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&auto=format&fit=crop&q=60'
            }
        ];

        await Project.insertMany(projects);
        console.log('Added Projects.');

        // Clients
        const clients = [
            {
                name: 'Rawham Smith',
                designation: 'CEO, TechSolutions',
                description: 'Flipr helped us find the perfect office space. Their team was professional, responsive, and truly understood our needs. Highly recommended!',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60'
            },
            {
                name: 'Shipra Kayak',
                designation: 'Brand Manager',
                description: 'The design team transformed our vision into reality. The attention to detail was impressive, and the project was delivered on time.',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60'
            },
            {
                name: 'John Lepore',
                designation: 'Real Estate Investor',
                description: 'Their market analysis was spot on. I appreciated the data-driven approach which helped me secure a fantastic investment property.',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=60'
            },
            {
                name: 'Marry Freeman',
                designation: 'Homeowner',
                description: 'Buying our first home was stressful until we met this team. They guided us through every step and made the process smooth and enjoyable.',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=60'
            }
        ];

        await Client.insertMany(clients);
        console.log('Added Clients.');

        console.log('Seeding Complete!');
        process.exit();
    } catch (err) {
        console.error('Seeding Error:', err);
        process.exit(1);
    }
};

seedData();
