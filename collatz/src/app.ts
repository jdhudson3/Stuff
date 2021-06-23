import { GenericCache } from './store/cache';

const express = require('express');
const collatzRouter = require('./controller/collatz');
const cacheRouter = require('./controller/store');

const app = express()

// set some sensible defaults
const port = process.env.PORT || 3000;

app.use('/collatz', collatzRouter);
app.use('/cache', cacheRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})