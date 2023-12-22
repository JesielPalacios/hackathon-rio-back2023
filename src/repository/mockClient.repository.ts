import { IUserRepository } from '../interface/clientRepository.interface';
import { Client } from '../models/client.model';

export class MockUserRepository implements IUserRepository {
  createOneUser(data: Client): Promise<Client> {
    const mockUser = {
      _id: '6563769f31e308a03d83d18f',
      ...data,
    } as Client;
    return Promise.resolve(mockUser);
  }
  updateOneUserById(data: Client): Promise<Client> {
    return Promise.resolve(data as unknown as Client);
  }
  deleteOneUserById(id: string) {
    return Promise.resolve(id);
  }
  findAllUsers(limit: number, offset: number): Promise<Client[]> {
    return Promise.resolve([]);
  }
  findOneUserById(id: string): Promise<Client> {
    return Promise.resolve({ id } as unknown as Client);
  }
}
