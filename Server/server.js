const express = require('express');
const cors = require('cors')
require('dotenv').config();
const mongoose = require('mongoose');
const teamSchema = require('./schema');

const { MongoClient } = require('mongodb')

const app = express();
app.use(cors())
app.use(express.json())

const client = new MongoClient(process.env.Uri)


// Connect to MongoDB (replace with your MongoDB connection string)
mongoose.connect(process.env.Uri , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB:', err);
});

// Route to get NBA data
app.get('/get', async (req, res) => {
    try {
        await client.connect(); //connect to db
        const database = client.db('nba_teams'); //checks for Database named TeamDB
        const collection = database.collection("teams"); //checks for collection within TeamDB with a name equal to userID
        const result = await collection.find().toArray(); //await your async db query and store the result in a variable for use later
        console.log(result); //log to the console if you want
        res.send(result); //this returns a value when the function is called
    } catch(e) {
        console.error(e);
    } finally {
        await client.close(); //using try, catch, finally is BEST practice.
        //Always close your collection after you've used it. OR ELSE
    }
    // try {
    //     let nbaData = await teamSchema.find().toArray();
    //     res.json(nbaData);
    // } catch (err) {
    //     res.status(500).json({ error: 'Failed to fetch data' });
    // }
});

app.listen(3010, () => {
    console.log('Server running on port 3010');
});
