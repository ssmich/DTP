const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();
require('./db/db')

app.listen(3000, ()=>{
    console.log('listening on port 3000');
})