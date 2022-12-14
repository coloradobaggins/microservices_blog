//POSTS

const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const posts = {};

app.get('/posts', (req, res)=>{

    res.send(posts);

});

app.post('/posts', async(req, res)=> {

    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    }

    //Emmit an event when someone made a new post. (TO the event bus)
    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    });

    res.status(201).send(posts[id]);

});

app.post('/events', (req, res)=>{

    console.log(`Event received: ${req.body.type}`);

    res.send({});

});

app.listen(PORT, ()=> console.log(`Listening on ${PORT}`));