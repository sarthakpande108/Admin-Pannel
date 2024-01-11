const http = require('http');
const app = require('./app');
const config = require('./config');


const port = config.PORT || 3000;

const server = http.createServer(app);



// Start the Express server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
