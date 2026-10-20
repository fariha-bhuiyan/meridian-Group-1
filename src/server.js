const app = require('./app');
const config = require('./config');

app.listen(config.port, () => {
  console.log(`${config.shopName} is running at http://localhost:${config.port}`);
});
