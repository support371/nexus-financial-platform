import { Request, Response, NextFunction } from 'express';

const CORS_ALLOWED_METHODS = 'GET,POST,PUT,PATCH,DELETE,OPTIONS';
const CORS_ALLOWED_HEADERS =
  'Origin,X-Requested-With,Content-Type,Accept,Authorization';

const getAllowedOrigins = (): Set<string> =>
  new Set(
    (process.env.CORS_ALLOWED_ORIGINS ?? '')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  );

export const strictCors = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  const allowedOrigins = getAllowedOrigins();
  const isAllowed =
    typeof origin === 'string' && origin.length > 0 && allowedOrigins.has(origin);

  if (isAllowed && origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', CORS_ALLOWED_METHODS);
    res.setHeader('Access-Control-Allow-Headers', CORS_ALLOWED_HEADERS);
  }

  if (req.method === 'OPTIONS' && isAllowed) {
    res.status(204).send();
    return;
  }

  next();
};
