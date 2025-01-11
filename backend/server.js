const express = require('express');
const app = express();
const db = require('./db.js');
require('dotenv').config({ path: './.env' });

const cors = require('cors')();
app.use(cors);

app.use(express.static(path.join(__dirname, '../frontend')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

let active_users = 0;
const max_users = 100;

app.use((req, res, next) => {
    if (active_users >= max_users) {
        res.status(503).send("Server Overloaded");
    } 
    else {
        active_users++;
        res.on("finish", () => {
            active_users--;
        });
        next();
    }
});

const logRequest = async (req, res, next) => {
    console.log(`${new Date().toLocaleString()}, Request made to ${req.originalUrl}`);
    next();
};
app.use(logRequest);

app.use('/api', require('./routes/review_routes.js'));

app.get('/', (req, res) => {
    res.send('Welcome to GOKUTO!');
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log("Server is live with " + PORT);
});

app.use("*", (req, res) => res.status(404).json({ error: "Not Found" }));