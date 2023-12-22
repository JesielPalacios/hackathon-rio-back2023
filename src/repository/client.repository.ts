import {
  IClientLogin,
  IClientLoginResponse,
  IClientRepository,
} from '../interface/clientRepository.interface';
import ClientSchema, { Client } from '../models/client.model';
import { uploadFiles } from '../utils/cloudinary';

export class ClientRepository implements IClientRepository {
  login(data: IClientLogin): Promise<IClientLoginResponse> {
    throw new Error('Method not implemented.');
  }

  async createOneClient(data: Client): Promise<Client> {
    let newClient = new ClientSchema({ ...data });

    if (data.files?.image) {
      const result = await uploadFiles(
        data.files.image.tempFilePath,
        'moviesAppClient/clients'
      );
      newClient._doc.image_public_id = result.public_id;
      newClient._doc.image_secure_url = result.secure_url;
    }

    // try {
    const savedClient = await newClient.save();

    let { password, ...others } = savedClient._doc;
    // } catch (error) {
    //   console.log('Error in createNewClient Controller: ', { error });
    //   // res.status(500).json(error)
    //   res.status(500).json({ ...error });
    // }
    return Promise.resolve(others);
  }

  updateOneClientById(data: Client): Promise<Client> {
    throw new Error('Method not implemented.');
  }
  deleteOneClientById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findAllClients(limit: number, offset: number): Promise<Client[]> {
    throw new Error('Method not implemented.');
  }
  findOneClientById(id: string): Promise<Client> {
    throw new Error('Method not implemented.');
  }
}
