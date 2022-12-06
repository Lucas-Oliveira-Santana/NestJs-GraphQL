import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../common/test/TestUtil';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockRepository = {
    find: jest.fn(),
    findOneById: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    mockRepository.find.mockReset();
    mockRepository.findOneById.mockReset();
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
    mockRepository.update.mockReset();
    mockRepository.delete.mockReset();
    mockRepository.findOne.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('should return all users', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.find.mockReturnValue([user, user]);
      const users = await service.findAllUsers();
      expect(users).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findUserById', () => {
    it('should return a user', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.findOneById.mockReturnValue(user);
      const userExists = await service.findUserById('1');
      expect(userExists).toMatchObject({ name: user.name });
      expect(mockRepository.findOneById).toHaveBeenCalledTimes(1);
    });

    it('should return a exception when the user does not exist', async () => {
      mockRepository.findOneById.mockReturnValue(null);

      expect(service.findUserById('3')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.findOneById).toHaveBeenCalledTimes(1);
    });
  });

  describe('createUser', () => {
    it('should be able to create a user', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.save.mockReturnValue(user);
      mockRepository.create.mockReturnValue(user);
      const savedUser = await service.createUser(user);
      expect(savedUser).toMatchObject(user);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should return a exception when the user was not saved', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.save.mockReturnValue(null);
      mockRepository.create.mockReturnValue(user);
      expect(service.createUser(user)).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateUser', () => {
    it('should be able to update a user', async () => {
      const user = TestUtil.giveMeAValidUser();
      const updatedUser = { name: 'name updated' };
      mockRepository.findOneById.mockReturnValue(user);
      mockRepository.update.mockReturnValue({ ...user, ...updatedUser });
      mockRepository.create.mockReturnValue({ ...user, ...updatedUser });

      const resultUser = await service.updateUser('1', {
        ...user,
        name: 'name updated',
      });

      expect(resultUser).toMatchObject(updatedUser);

      expect(mockRepository.findOneById).toHaveBeenCalledTimes(1);
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteUser', () => {
    it('should be able to delete a user', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.findOneById.mockReturnValue(user);
      mockRepository.delete.mockReturnValue(true);
      const deleteResult = await service.deleteUser('1');

      expect(deleteResult).toEqual(true);

      expect(mockRepository.findOneById).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should not delete a inexisting user', async () => {
      const user = TestUtil.giveMeAValidUser();
      mockRepository.findOneById.mockReturnValue(user);
      mockRepository.delete.mockReturnValue(null);
      const deleteResult = await service.deleteUser('5');

      expect(deleteResult).toEqual(false);

      expect(mockRepository.findOneById).toHaveBeenCalledTimes(1);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
