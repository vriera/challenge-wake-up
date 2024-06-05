import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError<any>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Customize error response based on exception
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception.driverError.code === '23505') {
      // Handle unique violation error
      status = HttpStatus.CONFLICT;
      message = 'Duplicate entry error';
    } else if (exception.driverError.code === '23503') {
      // Handle foreign key violation error
      status = HttpStatus.BAD_REQUEST;
      message = 'Foreign key violation error';
    }

    response.status(status).json({
      statusCode: status,
      path: request.url,
      message,
    });
  }
}
