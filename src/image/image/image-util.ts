import { extname } from 'path';
import * as fs from 'fs';

export const editFileName = (req, file: Express.Multer.File, callback) => {
  const name = 'plant-' + req.params.id;
  const fileExtName = extname(file.originalname);
  callback(null, `${name}${fileExtName}`);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const destinationPath = (req, file, callback) => {
  const filepath = 'image/' + req.user.id;
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath, { recursive: true });
  }
  callback(null, filepath);
};
