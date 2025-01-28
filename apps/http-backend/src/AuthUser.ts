import {Request,Response,NextFunction} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {JWTTOKEN} from './config';
export function AuthUser(req:Request,res:Response,next:NextFunction){
    if(!req.headers['authorization']){
        res.status(401).json({message:'Unauthorized'});
        return ;
    }
    const token=req.headers['authorization'];
    if(token){
        const decodedtoken=jwt.verify(token,JWTTOKEN) as JwtPayload;
        if(!decodedtoken|| decodedtoken.userId==null){
            res.status(401).json({message:'Unauthorized'});
            return ;
        }
        //@ts-ignore
        req.userId=decodedtoken.userId;
        next();
    }else{
        res.status(401).json({message:'Unauthorized'});
    }
}