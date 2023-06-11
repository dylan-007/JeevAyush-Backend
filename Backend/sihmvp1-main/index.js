const express = require('express');
const cors = require('cors');
const  bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cors({origin : true}));

//importing route

var routes = require('./routes/route'); //importing route
routes(app);

//Mongodb Atlas connection
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://san1:rzpnJXoqkpZZyTLU@cluster0.wxrladi.mongodb.net/?retryWrites=true&w=majority";
const  options = {
    useNewUrlParser:  true,
    useUnifiedTopology:  true
};  
mongoose.connect(uri, options).then(() => {
    console.log("Database connection established!");
    },
    err  => {
    {
    console.log("Error connecting Database instance due to:", err);
    }
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

const  port = process.env.PORT || 3000 ;
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

