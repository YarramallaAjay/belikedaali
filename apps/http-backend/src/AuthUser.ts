import jwt, { JwtPayload } from 'jsonwebtoken';
import {JWTTOKEN} from '@repo/backend-common/config';
import { Request,Response,NextFunction } from 'express';

export async function AuthUser(req:Request,res:Response,next:NextFunction){
    console.log(req.headers)
    if(!req.headers['authorization']){
        res.status(401).json({message:'token not found'});
        return ;
    }
    const token=req.headers['authorization'];
    if(token){
        console.log(JWTTOKEN)
        const decodedtoken=jwt.verify(token as string,JWTTOKEN) as JwtPayload;
        if(!decodedtoken|| decodedtoken.userId==null){
            res.status(401).json({message:'Invalid token'});
            return ;
        }
    
        //@ts-ignore
        req.userId=decodedtoken.userId;
        next();
    }else{
        res.status(401).json({message:'Unauthorized'});
    }
}