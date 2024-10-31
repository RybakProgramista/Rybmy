const express = require("express")
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const port = 2115;
app.listen(port, () =>{
    console.log("Nasłuchuje na porcie " + port);
});