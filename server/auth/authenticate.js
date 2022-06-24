import jwt from "jsonwebtoken";
import 'dotenv/config'

export const jwtGenerator = (_id) => {
    const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    return token;
}

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization || req.body.token || req.query.token;

    if (!token){
        res.sendStatus(401);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        
        if (err) {
            res.status(401).json({"msg":"Token not valid", err});
        } else {
            //add the _id to the req parameter and move forward
            req.user = decoded;
            next();
        }
    });
}