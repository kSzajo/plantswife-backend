import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { userImageDirectoryPath } from './image-util';
import { LoggedUserModel } from '../users/model/logged-user.model';

@Injectable()
export class ImageService {

  cleanUsersImageDirectory(user: LoggedUserModel, plantId: number, uploadImageFilename: string): void {
    const imagePath = userImageDirectoryPath(user.id.toString());
    fs.readdir(imagePath, (err, files) => {
      if (err) {
        console.error(err);
      }
      files.forEach(file => {
        const fileDir = path.join(imagePath, file);
        if (file !== uploadImageFilename && file.includes(`plant-${plantId}`)) {
          fs.unlinkSync(fileDir);
        }
      });

    });
  }

  getUserImagePlant(user: LoggedUserModel, plantId: number): { filename: string, rootPath: string } | undefined {
    const imagePath = userImageDirectoryPath(user.id.toString());
    const filesAv: string[] = fs.readdirSync(imagePath);
    const foundFile = filesAv.find(value => value.includes(`plant-${plantId}`));

    if (!!foundFile && imagePath) {
      return {
        filename: foundFile,
        rootPath: imagePath,
      };
    }

  }
}
