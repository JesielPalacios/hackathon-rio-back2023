import { Client } from '../models/client.model';

export interface IClientLogin {
  email: string;
  password: string;
}
export interface IClientLoginResponse {
  token: string;
}

export interface IClientRepository {
  createOneClient(data: Client): Promise<Client>;
  updateOneClientById(data: Client): Promise<Client>;
  deleteOneClientById(id: string);
  // deleteOneClientById(id: string): Promise<void>;
  findAllClients(limit: number, offset: number): Promise<Client[]>;
  findOneClientById(id: string): Promise<Client>;
  login(data: IClientLogin): Promise<IClientLoginResponse>;
}
