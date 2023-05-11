// Required packages/modules needed to run application
const express = require('express');
const sequelize = require('./config/connection');

// Setting up possible path to model so I dont forget to use this if I find I need it
// const modelIfNeeded = require('./models/modelIfNeeded');

// Instantiating express and setting up basic port config
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for express to allow additional data types
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allows seqelize to connect to the db before starting the server to ensure it loads
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
