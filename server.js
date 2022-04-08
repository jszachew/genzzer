const express = require("express")
const app = express()
const bodyParser = require('body-parser');
let port = process.env.PORT || 3000

const cors = require('cors');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.raw());
app.use(express.json())
app.use(cors())

const api = require('./routes/api.routes')

app.use('/api', api)
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });

app.listen(port, () =>{
    console.log(`running server on port ${port}`)
})