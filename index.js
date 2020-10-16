const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ro6jg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



const app = express()
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('photos'));
app.use(fileUpload());
const port = 5000


client.connect(err => {
  const Services = client.db("creativeAgency").collection("Service");
  const Reviews = client.db("creativeAgency").collection("Review");
  const Messages = client.db("creativeAgency").collection("Message");
  const Orders = client.db("creativeAgency").collection("Order");
  const Admins = client.db("creativeAgency").collection("Admin");

  console.log('database connected');

  // Add service from client
  app.post('/addAService', (req, res) => {
    const service = req.body;
    console.log(service)
    Services.insertOne(service)
      .then(result => {
        console.log(result);
      })
  });
  //Add review from client
  app.post('/addAReview', (req, res) => {
    const review = req.body;
    console.log(review)
    Reviews.insertOne(review)
      .then(result => {
        console.log(result);
      })
  })
  //Add Order from client
  app.post('/addAOrder', (req, res) => {
    const order = req.body;
    console.log(order)
    Orders.insertOne(order)
      .then(result => {
        console.log(result);
      })
  })
  //Add home messages/letter form from home page  
  app.post('/addAMessage', (req, res) => {
    const message = req.body;
    console.log(message)
    Messages.insertOne(message)
      .then(result => {
        console.log(result);
      })
  })
  //Add Admin email from Admin Panel  
  app.post('/addaAdmin', (req, res) => {
    const admin = req.body;
    console.log(admin)
    Admins.insertOne(admin)
      .then(result => {
        console.log(result);
      })
  })
  //Send service data from database
  app.get('/Service', (req, res) => {
    Services.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })
  //Send review from database
  app.get('/Review', (req, res) => {
    Reviews.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })
  //Send orders list from database
  app.get('/Order', (req, res) => {
    Orders.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

//Server working status
  app.get('/', (req, res) => {
    res.send('Creative Agency Server site working')
  })

});

app.listen(process.env.PORT || port)