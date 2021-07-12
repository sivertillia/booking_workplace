const express = require('express');
const authRouter = require('./routes/router');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json())
// app.use(bodyParser.json())
app.use('/', authRouter)

app.listen(PORT, function() {
    console.log(`Server started on host http://localhost:${PORT}`);
})