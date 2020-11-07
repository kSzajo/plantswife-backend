import { extname } from 'path';
import * as fs from 'fs';

export default class ImageUtil {
  static editFileName(req, file: Express.Multer.File, callback): void {
    const name = 'plant-' + req.params.id;
    const fileExtName = extname(file.originalname);
    callback(null, `${name}${fileExtName}`);
  };

  static imageFileFilter(req, file, callback): void {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  };

  static destinationPath(req, file, callback): void {
    const filepath = this.userImageDirectoryPath(req.user.id);
    if (!fs.existsSync(filepath)) {
      fs.mkdirSync(filepath, { recursive: true });
    }
    callback(null, filepath);
  };

  static userImageDirectoryPath(id: string): string {
    return 'image/user' + id;
  };
}

