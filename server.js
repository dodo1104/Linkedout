const express = require('express');
const io = require('socket.io')(3000);
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

//connect to db
connectDB();

//Init Middleware (get the data in req.body)
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: 'http://localhost:3006'
  })
);

//define routers
app.use('/users', require('./routes/api/users'));
app.use('/profile', require('./routes/api/profiles'));
app.use('/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
  console.log(socket.id);
});
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
