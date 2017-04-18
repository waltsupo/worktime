import * as express from 'express';
import * as bodyParser from 'body-parser';
import json = bodyParser.json;

const app = express();
const port = process.env.PORT || 80;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.all("/*", (req, res, next) => {
    res.header('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Content-type");
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.listen(port, function(){
    console.log('Server listening on port %d', port);
});