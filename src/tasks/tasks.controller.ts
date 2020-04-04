import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/createtask.dto';
import { SearchFilterDto } from './dto/search-filer.dto';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(
        @Query(ValidationPipe) searchFilterDto: SearchFilterDto,
        @GetUser() user: User,
    ): Promise<Task[]> {
        return this.tasksService.getAllTasks(searchFilterDto, user);
    }

    @Get('/:id')
    getTaskByID(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.getTaskByID(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDTO,
        @GetUser() user: User,
        ) {
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Delete('/:id')
    deleteTask(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.tasksService.deleteTaskByID(id, user);
        // return {message: 'data has been deleted successfully'};
    }

    @Patch('/:id')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number, @Body('status') status: TaskStatus,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status, user);
    }

}
