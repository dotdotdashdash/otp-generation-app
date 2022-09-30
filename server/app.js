require('dotenv/config');
const path = require('path');
const express = require(`express`);
const cors = require(`cors`);
const mongoose = require('mongoose');
const contactsRouter = require('./src/routes/contacts-router');
const messageRouter = require('./src/routes/message-router');


const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;

const app = new express();

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((succ)=>{
  console.log(`MongoDB connected!`);
}).catch((err)=> {
  console.log(`MongoDB connection error! Can't connect`, err.message);
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './dist/client')));

app.use(`/api/contacts`, contactsRouter);
app.use(`/api/messages`, messageRouter);

app.get('/*', (req, res)=> {
  res.sendFile(path.join(__dirname, './dist/client/index.html'));
});

app.listen(PORT, ()=> {
  console.log(`Hi, I'm listening at ${PORT}`);
});
