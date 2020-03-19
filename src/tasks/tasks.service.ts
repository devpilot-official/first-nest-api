import { Injectable, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDTO } from './dto/createtask.dto';
import { SearchFilterDto } from './dto/search-filer.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks() {
        return this.tasks;
    }

    getTaskFilter(searchFilterDto: SearchFilterDto) {
        const { status, search } = searchFilterDto;

        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if (search) {
            tasks = tasks.filter(task =>
                task.title.includes(search) ||
                task.description.includes(search),
            );
        }

        return tasks;
    }

    getTaskByID(id: string): Task {
        const found = this.tasks.find(task => task.id === id);

        if (!found) {
            throw new NotFoundException(`Task with ID: ${id} not found`);
        }

        return found;
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
        const found = this.getTaskByID(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskByID(id);
        task.status = status;
        return task;
    }

}
