//COMMENTS

const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

const PORT = 4001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//We really want this data structure to be optimized for looking up 
//for all the different comments associated with a given post.
const commentsByPostId = {};


app.get('/posts/:id/comments', (req, res)=>{

    res.send(commentsByPostId[req.params.id] || []);

});

app.post('/posts/:id/comments', async(req, res)=>{

    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    
    const comments = commentsByPostId[req.params.id] || []; //Recupero mensajes. Si no tengo, obtengo un array vacio, evito undefined

    comments.push({commentId, content});

    commentsByPostId[req.params.id] = comments;

    //Emmit an event when someone made a new comment. (TO the event bus)
    await axios.post('http://localhost:4005/events', {
        type: "CommentCreated",
        data:{
            id: commentId,
            content,
            postId: req.params.id
        }
    });

    res.status(201).send(comments);

});

app.post('/events', (req, res)=>{

    console.log(`Event received: ${req.body.type}`);

    res.send({});
});

app.listen(PORT, ()=> console.log(`Listening on ${PORT}`));