import { Request, Response, NextFunction } from 'express';

export function routeNotfound(req: Request, res: Response, next: NextFunction) {
	const error = new Error(`Route Not Found - ${req.originalUrl}`);
	logging.error(error);

	return res.status(404).json({
		message: error.message,
		stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
	});
}
