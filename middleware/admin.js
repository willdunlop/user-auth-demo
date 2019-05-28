

function admin(req, res, next) {
    if (!req.user.isAdmin) return res.status(403).send("Forbidden. Access denied");
    console.log("about the next")
    next();
}

export default admin;