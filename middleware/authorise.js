import jwt from "jsonwebtoken";
import config from "config";

function authorise(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Unauthorised. No token provided");

    try {
        const decoded = jwt.verify(token, config.get("JWT_PRIVATE_KEY"));
        req.user = decoded;
        next();
    }
    catch(err) {
        return res.status(400).send("Invalid Token");
    }
}

export default authorise;