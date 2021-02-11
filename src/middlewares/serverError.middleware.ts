import { NextFunction, Request, Response } from 'express';

const serverErrorMiddleware = (err: any, req: Request, res: Response, _next: NextFunction): void => {
  const { protocol, originalUrl, method } = req;
  const url = `${protocol}://${req.get('host')}${originalUrl}`;
  const { message = 'Unexpected error', code = 500, tags, details, stack } = err;
  const status = typeof code === 'number' && code < 600 ? code : 500;
  console.error(`[Error handler] ${message}`, { code, tags, details, stack, method, url });

  res.status(status).json({
    message,
    code,
    tags,
    details,
  });
};

export default serverErrorMiddleware;
