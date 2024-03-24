import http from 'http';
import express from 'express';
import './config/logging';
import { SERVER } from './config/config';
import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/cors';
import { routeNotfound } from './middleware/routeNotFound';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
	logging.info('------------------------------------------------');
	logging.info('Initializing API Server');
	logging.info('------------------------------------------------');
	application.use(express.urlencoded({ extended: true }));
	application.use(express.json());

	logging.info('------------------------------------------------');
	logging.info('Logging & Configurations');
	logging.info('------------------------------------------------');
	application.use(loggingHandler);
	application.use(corsHandler);

	logging.info('------------------------------------------------');
	logging.info('Define Controller Routing');
	logging.info('------------------------------------------------');
	application.get('/main/healthcheck', (req, res, next) => {
		res.status(200).json({ message: 'API is running' });
	});

	logging.info('------------------------------------------------');
	logging.info('Route Not found');
	logging.info('------------------------------------------------');
	application.use(routeNotfound);

	logging.info('------------------------------------------------');
	logging.info('Starting Server');
	logging.info('------------------------------------------------');
	httpServer = http.createServer(application);
	httpServer.listen(SERVER.port, () => {
		logging.info('------------------------------------------------');
		logging.info('Server Started on Port', SERVER.port);
		logging.info('------------------------------------------------');
	});
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();
