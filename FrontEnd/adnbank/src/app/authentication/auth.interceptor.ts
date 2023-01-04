import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientService } from 'src/services/client.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private clientService: ClientService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');

    if (token != null) {    
      const cloned = request.clone({
        setHeaders: {Authorization:`Bearer ${token}`}
      })      
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}
