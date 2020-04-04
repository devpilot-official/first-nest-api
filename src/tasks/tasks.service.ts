import { Injectable, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/createtask.dto';
import { SearchFilterDto } from './dto/search-filer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repo';
import { Task } from './task.entity';
import { create } from 'domain';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    async getAllTasks(searchFilterDto: SearchFilterDto, user: User): Promise<Task[]> {
        return await this.taskRepository.getTasks(searchFilterDto, user);
    }

    async getTaskByID(id: number, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });

        if (!found) {
            throw new NotFoundException(`Task with ID: ${id} not found`);
        }

        return found;
    }

    async createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteTaskByID(id: number, user: User): Promise<void> {
        const result = await this.taskRepository.delete({ id, userId: user.id });
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID: ${id} not found`);
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskByID(id, user);
        task.status = status;
        await task.save();
        return task;
    }

}
