//==============================================================================
// set up server================================================================
//==============================================================================
const keys                      = require('./config/keys')
const PORT                      = process.env.PORT || 5000;
//const LOCAL                     = "127.0.0.1";
const mongoose                  = require('mongoose')
const express                   = require('express')
const app                       = express()
const bodyParser                = require('body-parser')


let server                      = app

if (process.env.NODE_ENV !== 'production') {
  // Development logging
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//==============================================================================
// configuration ===============================================================
//==============================================================================
require('./models/expense');

mongoose.Promise = global.Promise;// connect to our database
mongoose.connect(keys.mongoURI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true })
        .then(connect => console.log('connected to mongodb'))
        .catch(err => console.log('could not connect to mongodb', err))
module.exports = {mongoose}


//==============================================================================
// routes ======================================================================
//==============================================================================
require('./routes/expenses.js')(app);

//==============================================================================
// launch ======================================================================
//==============================================================================
if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('../client/build'));

    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    const filepath = path.join(__dirname, '../client/build/index.html');

    app.get('*', (req, res) => {
        res.sendFile(filepath, function(err){
            if (err) 
                return res.status(err.status).end();
             else 
                return res.status(200).end();
        })
    })
}

//server.listen(PORT, LOCAL, (err) =>{
server.listen(PORT, (err) =>{
    if(!err){
        console.log('server started running on: ' + PORT);
        console.log('server NODE_ENV: ' + process.env.NODE_ENV);
    } else {
        console.log('unable to start server');}
    }
)
