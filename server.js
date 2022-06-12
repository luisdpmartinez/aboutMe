const express = require('express'),
  serveStatic = require('serve-static'),
  history = require('connect-history-api-fallback'),
  port = process.env.PORT || 5000;

const app = express();

app.use(history());
app.use(serveStatic(__dirname + '/dist/spa'));
app.set('etag', false);
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});
app.listen(port);
