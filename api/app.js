const express = require('express');
const app = express();
const port = 3000;

app.get('/delivery-slots', (req, res) => {
  res.send('This works now');
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})