/**
 *  *** EVENT BUS ***
 */

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 4005;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Watch for incoming event from "POSTS"
app.post('/events', (req, res)=>{

    const event = req.body;     //Whatever comes along in the request body, that is going to be our event.

    //Now we have got that event, we're going to make our series of post requests to our other running services.

    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event);

    res.json({status: 'OK'});

});

app.listen(PORT, ()=> console.log(`Listening on ${PORT}`));