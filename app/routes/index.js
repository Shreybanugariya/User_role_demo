const express=require('express');
const http=require('http');
const morgan =require('morgan');
const router =require('./api');


class Server {


    initialize() {
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.setupMiddleware();
        this.setupServer();
    }

    setupMiddleware() {
        this.app.use(express.static('src/app/seeds/'));
            this.app.use(express.json({ limit: '100kb' }));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(async (req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            next();
        });
        this.app.use(this.routeConfig);
        if (process.env.NODE_ENV !== 'prod') this.app.use(morgan('dev', { skip: req => req.path === 'api/v1/health' || req.path === '/favicon.ico' }));
        this.app.use('/api/v1', router);
        this.app.use('*', this.routeHandler);
        this.app.use(this.logErrors);
        this.app.use(this.errorHandler);
    }

    setupServer() {
        this.httpServer.timeout = 10000;
        this.httpServer.listen(3000, () => log.cyan(`Spinning on ${process.env.PORT} 🌀`));
    }

    routeConfig(req, res, next) {
        if (req.path === '/ping') return res.status(200).send({});
        res.reply = ({ code, message }, data = {}, header = undefined) => {
            res.status(code).header(header).jsonp({ message, data });
        };
        return next();
    }

    routeHandler(req, res) {
        res.status(404);
        return res.send({ message: 'Route not found' });
    }

    logErrors(err, req, res, next) {
        log.red(`${req.method} ${req.url}`);
        log.red(`body ->  ${_.stringify(req.body)}`);
        log.red(err.stack);
        return next(err);
    }

    errorHandler(err, req, res) {
        res.status(500);
        return res.send({ message: err });
    }
}

const server = new Server();
module.exports = server
