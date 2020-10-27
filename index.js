const express = require("express");
const app = express();
let port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("This is the landing page")
});

app.get("/home", (req, res) => {
    res.send("This is the home page")
})

app.listen(port, () =>{
    console.log(`Trail Finder is listening on port http://localhost:${port}`);
});