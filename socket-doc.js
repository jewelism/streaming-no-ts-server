/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'document')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'document', 'index.html'));
});
app.listen(3003);
console.log('serving socket-api document: http://localhost:3003');