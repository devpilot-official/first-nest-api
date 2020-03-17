import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDTO } from './dto/createtask.dto';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskByID(@Param('id') id: string): Task {
        return this.tasksService.getTaskByID(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDTO) {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string) {
        this.tasksService.deleteTaskByID(id);
        return {message: 'data has been deleted successfully'};
    }

}
