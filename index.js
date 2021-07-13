const express = require('express');
const authRouter = require('./routes/router');
const cors = require('cors');
const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors())
app.use(express.json())
app.use('/', authRouter)

app.listen(PORT, function() {
    console.log(`Server started on host http://localhost:${PORT}`);
})