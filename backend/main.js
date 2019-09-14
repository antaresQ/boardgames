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


//GET /api/games
app.get('/api/games',
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

//GET /search games by name
app.get('/api/gamesbyname/:name',
    (req,resp) => {
        client.db('boardgames')
        .collection('gameslist')
        .find({
            Name: {$regex: req.params.name}
        })
        .toArray()
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

//GET /search games by single category
//may need to paginate or slice
app.get('/api/gamesbycategory/:category',
    (req,resp) => {
        client.db('boardgames')
        .collection('gamesdetail')
        .aggregate(
            [
                {  $lookup: {
                    from: "gameslist",
                    localField: "id",
                    foreignField: "ID",
                    as: "boardgamelistinfo"
                    }
                },
                {
                    $match: {
                        boardgamecategory: { $regex: req.params.category}
                    }
                },
                {
                    $project: {
                        id: 1,
                        boardgamelistinfo: 1
                    }
                }
            ]
        )
        .toArray()
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

//GET full game details by Id
app.get('/api/game/:gameId',
    (req,resp) => {
        client.db('boardgames')
        .collection('gameslist')
        .aggregate(
            [
                {
                    $match: {ID: Number(req.params.gameId, 10)}
                },
                {  $lookup: {
                    from: "gamesdetail",
                    localField: "ID",
                    foreignField: "id",
                    as: "boardgamedetails"
                    }
                }
            ]
        )
        .toArray()
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


//GET /game comments
app.get('/api/comments/:gameId',
    (req,resp) => {
        client.db('boardgames')
        .collection('review')
        .find({ID:Number(req.params.gameId)})
        .toArray()
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