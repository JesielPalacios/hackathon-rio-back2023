import 'dotenv/config';
import expressApp from './expressApp';
import './utils/database';
import './utils/initialSetup';

export const StartServer = async () => {
  expressApp.listen(expressApp.get('port'), () => {
    console.log(`App is listening to ${expressApp.get('port')}`);
  });

  process.on('uncaughtException', async (err) => {
    console.log('mostrando el error que hizo que el server llegara aquí.')
    console.log('mostrando el error que hizo que el server llegara aquí.')
    console.log('mostrando el error que hizo que el server llegara aquí.')
    console.log('mostrando el error que hizo que el server llegara aquí.')
    console.log('mostrando el error que hizo que el server llegara aquí.')
    console.log(err);
    process.exit(1);
  });
};

StartServer().then(() => {
  console.log('server is up');
});
