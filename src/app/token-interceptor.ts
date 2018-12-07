import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    appToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJRdWl6emFibGVAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQXBwIiwiZXhwIjoxNTc1NTAwMDA0LCJpc3MiOiJodHRwOi8vd3d3LnNlY3VyaXR5Lm9yZyIsImF1ZCI6Imh0dHA6Ly93d3cuc2VjdXJpdHkub3JnIn0.xtw0nf3h45NNBBKVUzlG-cScHghUIxgjgY7gDIRZURM'
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add authorization header with jwt token if available
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
          request = request.clone({
              setHeaders: { 
                  Authorization: `Bearer ${this.appToken}`
              }
          });
      }
      return next.handle(request);
  }
}
