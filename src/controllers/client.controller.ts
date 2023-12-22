import { NextFunction, Request, Response } from 'express';
import { RequestValidator } from '../utils/requestValidator';
import { CreateUsertRequest } from '../dto/client.dto';
import { ClientService } from '../services/client..service';
import { ClientRepository } from '../repository/client.repository';
import ClientSchema from '../models/client.model';

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
      console.log('data', data);

      if (data) return res.status(201).json(data);
      // if (!data) return res.status(500).json({ message: 'Ocurrió un error.' });
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
