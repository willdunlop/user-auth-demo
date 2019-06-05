import winston from "winston";
import "winston-mongodb";

const logger = winston.createLogger({
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
        new winston.transports.File({ filenmae})
    ]
})