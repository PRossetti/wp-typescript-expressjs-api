import { Request, Response } from 'express';

const notFoundMiddleware = (req: Request, res: Response): void => {
  const { protocol, originalUrl, method } = req;
  const url = `${protocol}://${req.get('host')}${originalUrl}`;
  console.log('No resource found for the request', { method, url });

  res.status(404).json({
    message: 'No resource found for your request',
  });
};

export default notFoundMiddleware;
