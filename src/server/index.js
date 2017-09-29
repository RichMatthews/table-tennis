const express = require('express');

const app = express();

app.use('/', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

console.log(`started in ${process.env.NODE_ENV} mode`);

app.listen(process.env.PORT || 8080);
