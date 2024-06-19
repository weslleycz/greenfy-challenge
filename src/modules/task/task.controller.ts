import { Controller } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthTokenNotFound } from '../../common/swagger/responses/autokenNotFound.dto';
import { AuthTokenUnauthorized } from '../../common/swagger/responses/authTokenUnauthorized.dto';

@ApiTags('Task')
@Controller('task')
@ApiResponse({
  status: 401,
  description: 'Token não fornecido',
  type: AuthTokenNotFound,
})
@ApiResponse({
  status: 403,
  description: 'Token inválido',
  type: AuthTokenUnauthorized,
})
@ApiBearerAuth()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
}
