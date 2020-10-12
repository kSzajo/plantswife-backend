import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../../users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { User } from '../../users/entity/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;
  const userServiceFactory: any = () => new UsersService({} as Repository<any>);
  const jwtServiceFactory: any = () => new JwtService({});

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
        { provide: UsersService, useFactory: userServiceFactory },
        { provide: JwtService, useFactory: jwtServiceFactory }],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', async () => {
    expect(authService).toBeDefined();
  });

  describe('validate user', () => {
    it('should throw NotFoundException user not found', async () => {
      jest.spyOn(userService, 'getByEmail').mockImplementation(() => undefined);
      await expect(authService.validateUser({} as any)).rejects.toThrow(NotFoundException);
      await expect(userService.getByEmail).toBeCalledTimes(1);
    });

    it('should return user if user is valid', async () => {
      jest.spyOn(authService, 'verifyPassword').mockImplementation(() => {
        return Promise.resolve(true);
      });
      jest.spyOn(userService, 'getByEmail').mockImplementation(() => {
        return Promise.resolve(
          {
            password: 'doNotReturnThis!',
            email: 'a@a.a',
            name: 'name',
          } as User,
        );
      });

      await expect(authService.validateUser({} as any)).resolves.toEqual(
        {
          email: 'a@a.a',
          name: 'name',
        },
      );
      await expect(userService.getByEmail).toHaveBeenCalled();
    });

    it('should NOT return if user is NOT valid', async () => {
      jest.spyOn(authService, 'verifyPassword').mockImplementation(() => {
        return Promise.resolve(false);
      });
      jest.spyOn(userService, 'getByEmail').mockImplementation(() => {
        return Promise.resolve(
          {
            password: 'doNotReturnThis!',
            email: 'a@a.a',
            name: 'name',
          } as User,
        );
      });
      await expect(authService.validateUser({} as any)).resolves.toBeNull();
      await expect(userService.getByEmail).toHaveBeenCalled();
    });

  });

  describe('login', () => {
    it('should return access_token', async () => {
      jest.spyOn(jwtService, 'sign').mockImplementation(() => 'yesThisIsToken');
      await expect(authService.login({
        password: 'p4ssw04d!',
        name: 'name',
      } as User as any)).resolves.toEqual({ access_token: 'yesThisIsToken' });
      expect(jwtService.sign).toHaveBeenCalled();
      expect(jwtService.sign).toHaveBeenCalledWith({
        password: 'p4ssw04d!',
        name: 'name',
      });
    });

  });

  describe('register', () => {
    it('should throw error if email already taken', async () => {
      jest.spyOn(userService, 'getByEmail').mockImplementation(() => {
        return Promise.resolve({ email: 'email@email.com', password: 'encryptedPassword' } as User);
      });

      jest.spyOn(jwtService, 'sign').mockImplementation(() => 'yesThisIsToken');
      await expect(authService.register({
        email: 'bb@cc.dd',
        password: 'p4ssw04d!',
        name: 'name',
      } as User as any)).rejects.toThrow('Email already taken');
    });

    it('should call user service to create new user and respond without password', async () => {
      jest.spyOn(userService, 'getByEmail').mockImplementation(() => {
        return Promise.resolve(undefined);
      });

      jest.spyOn(userService, 'create').mockImplementation(() => {
        return Promise.resolve({
          email: 'bb@cc.dd', password: 'p4ssw04d!', name: 'name',
        } as User);
      });

      const output = await authService.register({
        email: 'bb@cc.dd',
        password: 'p4ssw04d!',
        name: 'name',
      });

      expect(output).toEqual({
        email: 'bb@cc.dd',
        name: 'name',
      });
    });

  });

});
