const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const posts = {};

app.get('/posts', (req, res)=>{

    res.send(posts);

});

//Receives events from EVENT BUS
app.post('/events', (req, res)=>{

    const { type, data } = req.body;

    if(type === 'PostCreated'){

        const { id, title } = data;

        posts[id] = { id, title, comments: [] };

    }

    if(type === 'CommentCreated'){

        const { id, content, postId } = data;

        const post = posts[postId]
        post.comments.push({id, content});

    }

    console.log(posts);
    
    res.send({});

}); 

app.listen(PORT, ()=> console.log(`Listening on ${PORT}`));