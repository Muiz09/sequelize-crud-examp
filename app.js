const express = require("express");
const app = express();
const cors = require("cors");
const port =  3000
const router = require("./routers");
// const errorHandling = require('./middlewares/errorhandling')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(router);
// app.use(errorHandling)

app.listen(port, () => {
  console.log(`MASOOOKKKKKK INI ${port}`);
});