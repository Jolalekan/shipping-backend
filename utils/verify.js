const jwt = require("jsonwebtoken")

const authorize = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    
    if (!token) {
        return res.status(401).json({ message: "No token included" })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log(err)
        if (err) {
            return res.status(401).json({ message: "Unauthorized user" })
        }
        req.user = decoded
        next()
    })
}

module.exports = {
    authorize
}