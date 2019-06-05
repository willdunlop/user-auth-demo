import winston from "winston";

function errorHandler (err, req, res, next) {
    winston.error(err.message, err);
    res.status(500).send(err.message);
    next();
}

export default errorHandler;