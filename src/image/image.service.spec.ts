import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from './image.service';
import ImageUtil from './image-util';
import { LoggedUserModel } from '../users/model/logged-user.model';
import * as fs from 'fs';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageService],
    }).compile();

    service = module.get<ImageService>(ImageService);
  });

  it('should return found file metadata', () => {
    expect(service).toBeDefined();
    fs.mkdir('temp', () => undefined);
    fs.appendFile('./temp/plant-1', 'a', () => undefined);


    jest.spyOn(ImageUtil, 'userImageDirectoryPath').mockImplementation(() => './temp');
    const result = service.getUserImagePlant({ id: 1 } as LoggedUserModel, 1);

    fs.rmdir('./temp', { recursive: true }, () => {
      console.log('error occurred during cleanup');
    });
    expect(result).toEqual({ 'filename': 'plant-1', 'rootPath': './temp' });
  });

  it('should remove spare images', () => {
    expect(service).toBeDefined();
    const imagePath = 'temp';

    fs.mkdir(imagePath, () => undefined);
    fs.appendFile('./temp/plant-1.jpg', 'a', () => undefined);
    fs.appendFile('./temp/plant-1.png', 'a', () => undefined);

    jest.spyOn(ImageUtil, 'userImageDirectoryPath').mockImplementation(() => `./${imagePath}`);
    let filesAv: string[] = fs.readdirSync(imagePath);
    expect(filesAv.length).toEqual(2);
    service.cleanUsersImageDirectory({ id: 1 } as LoggedUserModel, 1, 'plant-1.png');
    filesAv = fs.readdirSync(imagePath);
    expect(filesAv.length).toEqual(1);
    expect(filesAv[0]).toEqual('plant-1.png');
    fs.rmdir('./temp', { recursive: true }, () => {
      console.log('error occurred during cleanup');
    });
  });
});
