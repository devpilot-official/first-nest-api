import { Injectable, ParseUUIDPipe } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDTO } from './dto/createtask.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks() {
        return this.tasks;
    }

    getTaskByID(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    createTask(createTaskDto: CreateTaskDTO): Task {

        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }

    deleteTaskByID(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

}
