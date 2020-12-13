require('dotenv').config();
const app = require('./app.js');

function normalizePort(val) {
  const portNormalizePort = parseInt(val, 10);
  if (Number.isNaN(portNormalizePort)) return val;
  if (portNormalizePort >= 0) return portNormalizePort; 
  return false;
}

const port = normalizePort(process.env.API_PORT || '3007');
const address = process.env.ADDRESS || 'localhost';
app.set('port', port);
/* Expose Server */
app.listen(port, () => {
  console.log(`API: http://${address}:${port}`);
});
