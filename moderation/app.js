/**
 * Modeartion Service
 * All this service does is watch for events. (CommentCreated event)
 * Whenever we see CommentCreted, the moderation service is going to need
 * to emit the Comment Moderated Event
 */
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 4003;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/events', (req, res)=>{

});

const listener = app.listen(PORT, ()=> console.log(`Listening on ${listener.address().port}`));