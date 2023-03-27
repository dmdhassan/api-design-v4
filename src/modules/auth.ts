import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash)
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5)
}

export const createJwt = (user) => {
    const token = jwt.sign({
        id: user.id, username: 
        user.username}, 
        process.env.JWT_SECRET)

    return token;    
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;

    if(!bearer) {
        res.status(401)
        res.send({message: 'Not authorized', data: null})
        return;
    }

    const [,token] = bearer.split(" ");
    if (!token) {
        res.status(401);
        res.send({message: 'Invalid token', data: null})
        return;
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
        return;

    } catch (e) {
        console.log(e.message);
        res.status(402);
        res.send({message: 'Unauthorized', data: null});
        return;
    }
}