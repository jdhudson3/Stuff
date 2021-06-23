import { Router } from 'express';
import { GenericCache } from '../store/cache'

const singletonCache = GenericCache.getInstance(5000);
var cacheRouter = new Router();

// Home page route.
cacheRouter.get('/dump', function (req, res) {
  res.status(200)
    .json(singletonCache.getCacheContents());
})

// About page route.
cacheRouter.get('/stats', function (req, res) {
  res.status(200)
      .json(singletonCache.getStats());
})

module.exports = cacheRouter;