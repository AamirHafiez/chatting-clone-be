const express = require('express');
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

const pusher = new Pusher({
    appId: '1145498',
    key: '29cfa83648e5bb2d21cb',
    secret: 'b89d3f64182c7db08e23',
    cluster: 'ap2',
    encrypted: true
  });


app.get('/', (req, res) => {
    return res.json({
        message: 'healthy'
    });
});

app.post('/message', (req, res) => {
    const payload = req.body;
    pusher.trigger('private-chat', 'message', payload);
    return res.send(payload)
});

app.post("/pusher/auth", function(req, res) {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher.authenticate(socketId, channel);
    res.send(auth);
  });

app.listen(port, error => {
    error ? console.log(`Error in starting server at ${port}`, error) : console.log(`Server up and running at port ${port}`);
});