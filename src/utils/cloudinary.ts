import { v2 as cloudinary } from 'cloudinary';
import config from './config';
// import config from '../config/config.js'
// cloudinary.v2.uploader.upload(file, options).then(callback);

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiScret,
  secure: true,
});

export async function uploadFiles(filePath: string, path: string) {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'moviesAppSVGAFiles/' + path,
  });
}

export async function deleteImage(publicId) {
  return await cloudinary.uploader.destroy(publicId, {
    resource_type: 'image',
  });
}
