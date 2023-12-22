import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ClientSchema from '../models/client.model';
import config from '../utils/config';

class AuthControlador {
  public async sigIn(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    if (!email || !req.body.password) {
      return res
        .status(400)
        .json({ message: 'El correo y la contraseña son obligatorios.' });
    }

    const client = await ClientSchema.findOne({ email });

    if (!client)
      return res.status(400).json({ message: 'El cliente no existe.' });

    const matchPassword = await client.verifyPassword(req.body.password);

    if (!matchPassword)
      return res.status(400).json({ message: 'La contraseña es incorrecta.' });

    try {
      const accessToken = jwt.sign({ id: client._id }, config.jwtPassSec!, {
        // expiresIn: 86400, // 24 hours
        expiresIn: '8h',
      });

      const { password, ...others } = client._doc;

      res.header('Access-Control-Allow-Origin', '*');

      res.status(200).json({ ...others, accessToken });
    } catch (err) {
      console.log('Error in logIn Controller: ', { err });
      res.status(500).json({ err });
      next();
    }
  }

  public async sigUp(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    if (!email || !req.body.password) {
      return res
        .status(400)
        .json({ message: 'El correo y la contraseña son obligatorios.' });
    }

    const user = await ClientSchema.findOne({ email });

    if (user) return res.status(400).json({ message: 'El usuario ya existe.' });

    if (!user) {
      if (req.body.password.length < 7)
        return res.status(400).json({
          message: 'La contraseña es muy débil, mínimo 8 caracteres.',
        });

      let newUser = new ClientSchema({ ...req.body });

      if (newUser) {
        try {
          const accessToken = jwt.sign(
            { id: newUser._id },
            config.jwtPassSec!,
            {
              // expiresIn: 86400, // 24 hours
              expiresIn: '8h',
            }
          );

          const { password, ...others } = newUser._doc;

          res.header('Access-Control-Allow-Origin', '*');

          res.status(200).json({ ...others, accessToken });
        } catch (err) {
          console.log('Error in register Controller: ', { err });
          res.status(500).json({ err });
          next();
        }
      } else {
        return res.status(400).json({
          message: 'Ocurrió un error en el servidor',
        });
      }
    }
  }
}

export const authCtrl = new AuthControlador();
