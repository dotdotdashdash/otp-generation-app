require('dotenv/config');
const express = require(`express`);
const cors = require(`cors`);
const mongoose = require('mongoose');
const contactsRouter = require('./src/routes/contacts-router');


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

app.use(`/api/contacts`, contactsRouter);

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, exitCode) {
    if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}

app.listen(PORT, ()=> {
  console.log(`Hi, I'm listening at ${PORT}`);
});
