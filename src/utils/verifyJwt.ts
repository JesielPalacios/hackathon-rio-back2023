import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import config from './config';

let idUsuario: number;

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers['authorization'];
  let jwtPayload: any;

  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret!);
    res.locals.jwtPayload = jwtPayload;
  } catch (e) {
    return res.status(401).json({ mensaje: 'No autorizado1.' });
  }

  const { numeroIdentificacion, correo } = jwtPayload;
  idUsuario = numeroIdentificacion;

  const nuevoToken = jwt.sign(
    { numeroIdentificacion, correo },
    config.jwtSecret!,
    { expiresIn: '8h' }
  );
  res.setHeader('token', nuevoToken);

  // Call next
  next();
};

export const devuelveNumeroIdentificacion = () => {
  return idUsuario;
};
