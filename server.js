const express = require("express")
const app = express()
const bodyParser = require('body-parser');
let port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.raw());
app.use(express.json())

const api = require('./routes/api.routes')

app.use('/api', api)

app.listen(port, () =>{
    console.log(`running server on port ${port}`)
})