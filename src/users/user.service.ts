import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entties/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getAll() {
    const users = await this.userRepository.find({});
    return users;
  }

  async setHost(id: number): Promise<any> {
    const isUserExist = this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!isUserExist) {
      throw new NotFoundException('No User exists with the given ID');
    }
    const isUpdate = this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ is_host: 1 })
      .where('id = :id', { id })
      .execute();

    return isUpdate;
  }
}
