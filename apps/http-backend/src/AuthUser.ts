import jwt, { JwtPayload } from 'jsonwebtoken';
import {JWTTOKEN} from '@repo/backend-common/config';
import { Request,Response,NextFunction } from 'express';
import cookie from 'cookie'

export async function AuthUser(req:Request,res:Response,next:NextFunction){
    console.log(req)

    if(!req.headers.cookie){
         
        res.status(401).json({message:'cookie not found'})
        return ;
    }


    const {token}=cookie.parse(req.headers.cookie) || " ";


    if(!token){
        res.status(401).json({message:'token not found..unauthorized!'});
        return ;
    }
        console.log(JWTTOKEN)
        const decodedtoken=jwt.verify(token as string,JWTTOKEN) as JwtPayload;
        if(!decodedtoken|| decodedtoken.userId==null){
            res.status(401).json({message:'Invalid token'});
            return ;
        }
    
        // @ts-ignore
        req.userId=decodedtoken.userId;
        next();
}