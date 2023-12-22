import {
  IClientLogin,
  IClientRepository,
} from '../interface/clientRepository.interface';

export class ClientService {
  private _repository: IClientRepository;

  constructor(repository: IClientRepository) {
    this._repository = repository;
  }

  async createOneClientService(input: any) {
    const data = await this._repository.createOneClient(input);
    if (!data._id) {
      throw new Error('No se puede crear el cliente.');
    }
    if (data._id) {
      // send email
    }
    return data;
  }

  async updateOneClientByIdService(input: any) {
    const data = await this._repository.updateOneClientById(input);
    // emit event to update record in Elastic search
    return data;
  }

  // instead of this we will get client from Elastic search
  async getAllClientsService(limit: number, offset: number) {
    const clients = await this._repository.findAllClients(limit, offset);

    return clients;
  }

  async getOneClientByIdService(id: string) {
    const client = await this._repository.findOneClientById(id);
    return client;
  }

  async deleteOneClientByIdService(id: string) {
    const response = await this._repository.deleteOneClientById(id);
    // delete record from Elastic search
    return response;
  }

  async ClientLoginService(data: IClientLogin) {
    const response = await this._repository.login(data);
    return response;
  }
}
