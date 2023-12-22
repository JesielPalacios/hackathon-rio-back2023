import express from 'express';
import { clientCtrl } from '../controllers/client.controller';
import { authJwt } from '../utils/authJwt';
import { verifyJwt } from '../utils/verifyJwt';

const router = express.Router();

router
  .route('/clients')

  // GET ALL CLIENTS
  .get([verifyJwt, authJwt(['Administrator'])], clientCtrl.getAllClients)

  // CREATE ONE CLIENT
  .post(clientCtrl.createNewClient);

router
  .route('/client/:id')

  // GET ONE CLIENT BY ID
  .get(
    [verifyJwt, authJwt(['Administrator', 'Guest'])],
    clientCtrl.getOneClientById
  )

  // UPDATE ONE CLIENT BY ID
  .put(
    [verifyJwt, authJwt(['Administrator', 'Guest'])],
    clientCtrl.updateOneClientById
  )

  // DELETE ONE CLIENT BY ID
  .delete(
    [verifyJwt, authJwt(['Administrator', 'Guest'])],
    clientCtrl.deleteOneClientById
  );

router
  .route('/clients/clients-stats')

  // GET CLIENTS STATS
  .get([verifyJwt, authJwt(['Administrator'])], clientCtrl.clientsStats);

export default router;
