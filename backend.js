const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Sample data
const hospitals = [
    { id: 'elite', name: 'Elite Mission Hospital' },
    { id: 'metro', name: 'Metropolitan' },
    { id: 'sun', name: 'Sun Medicals' },
    { id: 'jubilee', name: 'Jubilee Mission' },
    { id: 'college', name: 'Medical College' },
];

const facilities = {
    consultation: ['Dr. Nayana Pradeep', 'Dr. Vandana', 'Dr. Remesh', 'Dr. Arun Mohan', 'Dr. Ravi', 'Dr. Araya Alex', 'Dr. Haridas'],
    lab: ['BMP', 'CMP', 'TSH', 'CBC', 'UA'],
    scanning: ['CT', 'MRI', 'ECG', 'X-RAY', 'PET']
};

const bookings = [];

// Routes

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to Doc On Demand Backend!');
});

// Get all hospitals
app.get('/hospitals', (req, res) => {
    res.json(hospitals);
});

// Get facilities by type
app.get('/facilities/:type', (req, res) => {
    const type = req.params.type;
    if (facilities[type]) {
        res.json(facilities[type]);
    } else {
        res.status(404).json({ error: 'Facility type not found' });
    }
});

// Submit booking
app.post('/book', (req, res) => {
    const { name, phone, email, hospital, facility, time } = req.body;

    if (!name || !phone || !email || !hospital || !facility || !time) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const booking = { id: bookings.length + 1, name, phone, email, hospital, facility, time };
    bookings.push(booking);
    res.json({ message: 'Booking confirmed!', booking });
});

// Get all bookings
app.get('/bookings', (req, res) => {
    res.json(bookings);
});

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});
