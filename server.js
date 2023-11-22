const express = require("express")
let app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const router = require("./routes/todo");


const cors = require('cors');
const corsOptions ={
  origin:process.env.BASE_URL,
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));


mongoose.connect(process.env.MONGO_URI).then(() => console.log("Mongodb connected"))
.catch((error) => console.log("Error connecting to mongodb", error))


app.use(express.json());

const port = process.env.PORT || 5000;

// todos is route ex : localhost:5000/todos
app.use('/todos', router);



app.listen(5000, () => console.log("server running on : "+ port))