import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, userId } = createTaskDto;
    
    const task = this.tasksRepository.create({
      title,
      description,
      user: { id: userId },
    });

    return this.tasksRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find({
      relations: {
        user: true, 
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        user: {
          id: true,
          username: true,
        },
      },
    });
  }
}