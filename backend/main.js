// Load libraries
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

// Configure PORT
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;

// Load DB configuration 
const config = require('./config.json');
const URL = config.mongolocal || 'mongodb://localhost:27017'

// Create an instance of MongoClient
const client = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true })

// Create an instance of the application
const app = express();

app.use(bodyParser.json());


//GET /api/games
app.get('/api/games',
    (req,resp) => {
        client.db('boardgames')
        .collection('gameslist')
        .find({})
        .sort({ID:1})
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


//GET brief info of specific game info shown in gameslist by Id
app.get('/api/gamebrief/:gameId',
    (req,resp) => {
        client.db('boardgames')
        .collection('gameslist')
        .find({
            ID: Number(req.params.gameId)
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

//GET  FULL game details by Id
app.get('/api/game/:gameId',
    (req,resp) => {
        client.db('boardgames')
        .collection('gameslist')
        .aggregate(
            [
                {
                    $match: {ID: Number(req.params.gameId, 10)}
                },
                {  
                    $lookup: {
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

app.post('/api/addcomment',
    (req,resp) => {

        client.db('boardgames')
        .collection('review')
        .find().limit(1).sort({$natural:-1})
        .toArray()
        .then(result => {

            req.body.index = result[0].index + 1;

            client.db('boardgames')
            .collection('review')
            .insertOne(req.body
                // {
                //     user: req.body.user,
                //     rating: req.body.rating,
                //     comment: req.body.comment,
                //     ID: req.body.ID,
                //     name: req.body.name 
                // }
                , function (error, result) {
                if (error) {
                    resp.send('>> API Error:' + error)
                }
                else
                    resp.send({data:">> API Success: "});
            })

        })
        .catch(error=> {
            resp.status(400)
            resp.end(error)
        })
        
    }
)


app.get('/api/getLatestReview',
    (req,resp) => {
        client.db('boardgames')
        .collection('review')
        .find().limit(1).sort({$natural:-1})
        .toArray()
        .then(result => {
            resp.json(result);
            console.info(result[0].index);
        })
        .catch(error=> {
            // resp.status(400)
            // resp.end(error)
        })
    }
)

// connect to mongo/boardgames
client.connect(
    (err, client) => {
        if (err) {
            console.error('fail to boardgames DB:', err)
            return;
        }
        console.info('connected to boardgames DB')
        // Start the server
        app.listen(PORT, () => {
            console.info(`Application started on port ${PORT} at ${new Date()}`);
        })
    }
)