import { TaskStatus } from '../tasks.model';

export class SearchFilterDto {
    status: TaskStatus;
    search: string;
}
