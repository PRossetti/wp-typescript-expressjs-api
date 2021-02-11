import { NextFunction, Request } from 'express';
import NodeCache from 'node-cache';

const cache = new NodeCache(); // all settings by default

const cacheMiddleware = (ttl = 60) => (req: Request, res: any, next: NextFunction) => {
  const { protocol, originalUrl, method } = req;
  if (method === 'GET') {
    const url = `${protocol}://${req.get('host')}${originalUrl}`;
    const value = cache.get(url);
    if (value !== undefined) {
      res.set('X-Cached-Response-Version', true);
      res.json(value);
      return;
    }
    res.sendJson = res.json;
    res.json = (json) => {
      cache.set(url, json, ttl);
      res.sendJson(json);
    };
  }

  next();
};

export default cacheMiddleware;
