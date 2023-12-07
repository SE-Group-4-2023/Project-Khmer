const express = require('express');
require('dotenv').config();
require('./example/db.js')
const userRouter = require('./router/user')
const User = require('./example/usersInfo.js')
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(userRouter);


app.get('/', (req, res) => {
  	res.json({sucess: true, message: 'welcome to backend'});
});

app.listen(PORT, () => {
  	console.log('port is lisening');
});

