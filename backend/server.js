const http = require('http'); // Import HTTP module
const app = require('./app'); // Import your express app
const dotenv = require('dotenv');
const SocketManager = require('./websockets/socketManager');


dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 7000;

const server = http.createServer(app);
const socketManager = new SocketManager(server);

// Start the server
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
