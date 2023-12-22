import ClientSchema from '../models/client.model';
import config from './config';

export const createClient = async () => {
  // check for an existing client
  const clientFound = await ClientSchema.findOne({ email: config.ADMIN_EMAIL });
  if (clientFound) return;

  // create a new client
  const newClient = await ClientSchema.create({
    email: config.ADMIN_EMAIL,
    password: config.ADMIN_PASSWORD,
  });

  console.log(`new client created: ${newClient.email}`);
};

createClient();
