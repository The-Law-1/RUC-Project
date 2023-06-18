const express = require('express');
const os = require('os');
const measurementsRoutes = require('./routes/measurementsRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const cors = require('cors');

const app = express();

// Middleware to parse request body
app.use(express.json());

// cors middleware
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // * = allow all, replace * with http://localhost:3000 to allow only that address
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Which headers are allowed
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); // Which methods are allowed
//         return res.status(200).json({});
//     }
//     next();
// });

// app use cors
app.use(cors());

// Define your routes
app.use('/measurements', measurementsRoutes);
app.use('/weather', weatherRoutes);

// Determine the IP address dynamically
const interfaces = os.networkInterfaces();
const addresses = [];
for (const key in interfaces) {
    for (const interface of interfaces[key]) {
        if (interface.family === 'IPv4' && !interface.internal) {
            addresses.push(interface.address);
        }
    }
}

// Start the server
const port = 3001; // Set your desired port number
app.listen(port, () => {
    addresses.forEach((address) => {
        console.log(`Server is running on http://${address}:${port}`);
    });
});
