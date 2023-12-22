import { NextFunction, Request, Response } from 'express';
import { RequestValidator } from '../utils/requestValidator';
import { CreateUsertRequest } from '../dto/client.dto';
import { ClientService } from '../services/client..service';
import { ClientRepository } from '../repository/client.repository';
import ClientSchema from '../models/client.model';
import { transporter } from '../utils/mailer';
import { passwordChangedSuccessful } from '../utils/constants';
import { capitalizeFirstLetter } from '../utils/helpers';
import config from '../utils/config';

// import jwt from 'jsonwebtoken';
// import ClientSchema from '../models/client.model';
// import config from '../utils/config';

export const clientService = new ClientService(new ClientRepository());

class ClientControlador {
  public async getAllClients(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({
      message: 'success',
    });
  }

  public async createNewClient(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // console.clear();
      // console.log('req.body.preferences', req.body.preferences);
      // console.log('req.body.preferences', typeof req.body.preferences);
      // console.log('req.body.preferences', JSON.parse(req.body.preferences));

      req.body.preferences = JSON.parse(req.body.preferences);
      // console.log('req.body', req.body);

      const storedUser = await ClientSchema.findOne({ email: req.body.email });
      if (storedUser)
        return res.status(400).json({
          message: 'Ya existe una cuenta con este correo electrónico.',
        });

      const { errors, input } = await RequestValidator(CreateUsertRequest, req);
      // console.log('errors', errors)

      if (errors)
        return res.status(400).json({ message: 'Verifique los datos.' });
      const data = await clientService.createOneClientService(input);

      if (data) {
        // if (!data) return res.status(500).json({ message: 'Ocurrió un error.' });

        try {
          // send mail with defined transport object
          await transporter.sendMail({
            // from: `"Cambio de contraseña 👻"<${account.user}>`, // sender address
            from: `"REYPELISTV 🔥"<${config.ADMIN_EMAIL}>`, // sender address
            to: data.email, // list of receivers
            subject: 'Cuenta creada exitosamente', // Subject line
            // text: 'Hello world? plain text body', // plain text body
            // html: '<b>Hello world? html body</b>', // html body
            html: (
              await passwordChangedSuccessful(
                capitalizeFirstLetter(data.firstName + ' ' + data.firstSurname)
              )
            ).toString(),
          });
          console.log(
            `Sent successfully to ${capitalizeFirstLetter(
              data.firstName + ' ' + data.firstSurname + ' in ' + data.email
            )}`
          );

          return res.status(201).json(data);
        } catch (err) {
          console.log(err);
          throw new Error('Algo salió mal..');
        }
      }
    } catch (error) {
      const err = error as Error;
      console.log('err');
      console.log('err');
      console.log('err');
      console.log('err');
      console.log('err');
      console.log('err', err);
      console.log('err');
      console.log('err');
      console.log('err');
      console.log('err');
      console.log('err');
      return res.status(500).json({ message: err.message });
      // next();
    }
  }

  public async getOneClientById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return res.status(200).json({
      message: 'success',
    });
  }

  public async updateOneClientById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return res.status(200).json({
      message: 'success',
    });
  }

  public async deleteOneClientById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return res.status(200).json({
      message: 'success',
    });
  }

  public async clientsStats(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({
      message: 'success',
    });
  }
}

export const clientCtrl = new ClientControlador();
