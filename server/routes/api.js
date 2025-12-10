const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Models
const Project = require('../models/Project');
const Client = require('../models/Client');
const Contact = require('../models/Contact');
const Subscriber = require('../models/Subscriber');

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// --- PROJECTS ---

// Get all projects
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a project
router.post('/projects', upload.single('image'), async (req, res) => {
    try {
        const { name, description } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';

        const newProject = new Project({
            name,
            description,
            image
        });

        const savedProject = await newProject.save();
        res.json(savedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a project
router.delete('/projects/:id', async (req, res) => {
    console.log('DELETE PROJECT REQUEST:', req.params.id);
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            console.log('Project not found in DB');
            return res.status(404).json({ message: 'Project not found' });
        }
        console.log('Project deleted');
        res.json({ message: 'Project deleted' });
    } catch (err) {
        console.error('Delete Error:', err);
        res.status(500).json({ message: err.message });
    }
});

// --- CLIENTS ---

// Get all clients
router.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a client
router.post('/clients', upload.single('image'), async (req, res) => {
    try {
        const { name, designation, description } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';

        const newClient = new Client({
            name,
            designation,
            description,
            image
        });

        const savedClient = await newClient.save();
        res.json(savedClient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a client
router.delete('/clients/:id', async (req, res) => {
    console.log('DELETE CLIENT REQUEST:', req.params.id);
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            console.log('Client not found in DB');
            return res.status(404).json({ message: 'Client not found' });
        }
        console.log('Client deleted');
        res.json({ message: 'Client deleted' });
    } catch (err) {
        console.error('Delete Error:', err);
        res.status(500).json({ message: err.message });
    }
});

// --- CONTACT FORM ---

// Submit contact form
router.post('/contact', async (req, res) => {
    try {
        const { fullName, email, mobileNumber, city } = req.body;
        const newContact = new Contact({
            fullName,
            email,
            mobileNumber,
            city
        });
        await newContact.save();
        res.json({ message: 'Contact form submitted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all contact submissions (Admin)
router.get('/contact', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- NEWSLETTER ---

// Subscribe
router.post('/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        // Check if already exists
        const existing = await Subscriber.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        res.json({ message: 'Subscribed successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get subscribers (Admin)
router.get('/subscribers', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
