const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models');
const multer = require('multer');
const path = require('path');

const app = express();

// const allowedOrigins = [
//     "http://localhost:4200"
//   ];
// app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Upload File

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // The folder where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename for the uploaded file
  },
});

const upload = multer({ storage: storage });

// ----------------------------------------------------------------

// app.use('/uploads', express.static('uploads'));


// Step 6: Set up a route to serve an HTML form for file uploads
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  

app.use(require('./routes')(upload));



db.sequelize.sync().then(()=>{
    console.log('Models Sync Successfully')
}).catch((err)=>{  
    console.log('Unable to sync model', err)
});


module.exports = app;



