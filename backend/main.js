// Load libraries
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

// Configure PORT
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;

// Load DB configuration 
const config = require('./config.json');
const URL = config.mongo || 'mongodb://localhost:27017'

// Create an instance of MongoClient
const client = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true })

// Create an instance of the application
const app = express();


//GET /game
app.get('/game',
    (req,resp) => {
        client.db('boardgames')
        .collection('gameslist')
        .distinct('Name')
        .then(result => {
            resp.status(200)
            resp.type('application/json')
            resp.json(result)
        })
        .catch(error=> {
            resp.status(400)
            resp.end(error)
        })
    }

)


// connect to mongo/boardgames
client.connect(
    (err, client) => {
        if (err) {
            console.error('fail to restaurant:', err)
            return;
        }
        console.info('connected to restaurant')
        // Start the server
        app.listen(PORT, () => {
            console.info(`Application started on port ${PORT} at ${new Date()}`);
        })
    }
)