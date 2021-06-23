import { Router } from 'express';
import { Collatz } from '../service/collatz'
import { GenericCache } from '../store/cache'
const collatzRouter = new Router();
const singletonCache = GenericCache.getInstance(5000);
const collatz = new Collatz(singletonCache);

// just generates numbers from input, nothing fancy
collatzRouter.get('/generate/:input', async function (req, res) {
  let input = parseInt(req.params["input"]);

  if (input < 1) {
    res.status(400)
        .send('Path parameter [input] must be positive number.')
  } else {
    let response = await collatz.compute(input);
    res.status(200)
        .send(response.toString());
  }
})

module.exports = collatzRouter;