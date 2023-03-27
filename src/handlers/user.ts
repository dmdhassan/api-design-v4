import prisma from "../db";
import { comparePassword, createJwt, hashPassword } from "../modules/auth";


export const createNewUser = async (req, res, next) => {
   try {
    const hash = await hashPassword(req.body.password);
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: hash
        }
    })

    const token = createJwt(user);
    res.json({token});

   } catch(e) {
    
    e.type = "input";
    next(e);

   }
}

export const signIn = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    });

    const isValid = await comparePassword(req.body.password, user.password);

    if (!isValid) {
        res.status(401);
        res.json({message: "Incorrect username or password"});
        return;
    }

    const token = createJwt(user);
    res.json({token});
}