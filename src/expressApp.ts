import express from 'express';
import indexRoutes from './api/index.routes';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
// import { createAdmin } from '../initialSetup';
import fileUpload from 'express-fileupload';
import config from './utils/config';
import './utils/mailer';
// Initializations
const app = express();
app.use(express.json());
var corsOptions = {
  origin: config.client,
  // optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Settings
app.set('port', process.env.PORT || 8080);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());
// Note that this option available for versions 1.0.0 and newer.
app.use(
  fileUpload({
    useTempFiles: true,
    // tempFileDir : '/tmp/'
    tempFileDir: 'uploads/',
  })
);

// Routes
app.use('/api', indexRoutes);

app.use('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

// // this folders for this application will be used to store public file images
app.use('/uploads', express.static(path.resolve('uploads')));

// Not found route
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export default app;
