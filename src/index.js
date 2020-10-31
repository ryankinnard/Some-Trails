const express = require('express');
const bodyParser = require('body-parser')


const app = express();

// middlewares
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// configure routes
app.get('/', (req, res) => {
    res.send('This is the landing page\nSam was here\nRon was also here')
});

app.get('/home', (req, res) => {
    res.send('This is the home page');
})

app.get('/health', (req, res) => {
    res.send('Healthy!');
})

app.listen(port, () => {
    console.log(`Trail Finder is listening on port http://localhost:${port}`);
});
