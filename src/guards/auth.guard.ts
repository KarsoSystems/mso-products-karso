/**
 * @AuthGuard Se encarga de validar que las solicitudes esten autenticadas
 */
import { whiteList } from 'src/utils/validations';
import { Observable } from 'rxjs';
import { HTTPMSG_UNAUTHORIZED } from 'src/utils/mensajes';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const [req] = context.getArgs();

    if (whiteList(req.url)) {
      return true;
    }

    if (!req.headers.auth) {
      throw new HttpException(HTTPMSG_UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
