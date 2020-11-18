import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { LoggedUserModel } from '../users/model/logged-user.model';
import ImageUtil from './image-util';

@Injectable()
export class ImageService {

  cleanUsersImageDirectory(user: LoggedUserModel, plantId: number, uploadImageFilename: string): void {
    const imagePath = ImageUtil.userImageDirectoryPath(user.id.toString());
    const files: string[] = fs.readdirSync(imagePath);
    files.forEach(file => {
      const fileDir = path.join(imagePath, file);
      if (file !== uploadImageFilename && file.includes(`plant-${plantId}`)) {
        fs.unlinkSync(fileDir);
      }
    });
  }

  getUserImagePlant(user: LoggedUserModel, plantId: number): { filename: string, rootPath: string } | undefined {
    const imagePath = ImageUtil.userImageDirectoryPath(user.id.toString());
    try {
      const filesAv: string[] = fs.readdirSync(imagePath);
      const foundFile = filesAv.find(value => value.includes(`plant-${plantId}`));
      if (!!foundFile && imagePath) {
        return {
          filename: foundFile,
          rootPath: imagePath,
        };
      }
    } catch (e) {
    }

  }

  deleteImage(userId: number, plantId: number) {
    const imagePath = ImageUtil.userImageDirectoryPath(userId.toString());
    const files: string[] = fs.readdirSync(imagePath);
    files.forEach(file => {
      const fileDir = path.join(imagePath, file);
      if (file.includes(`plant-${plantId}`)) {
        fs.unlinkSync(fileDir);
      }
    });

  }
}
