import { HttpInterceptorFn } from '@angular/common/http';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { MsalService } from '@azure/msal-angular';
import { InteractionType, SilentRequest } from '@azure/msal-browser';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };


// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem('access_token'); // Token guardado tras login

//     if (token) {
//       const authReq = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return next.handle(authReq);
//     }

//     return next.handle(req);
//   }
// }

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private msalService: MsalService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const account = this.msalService.instance.getActiveAccount();

    const silentRequest: SilentRequest = {
      scopes: ['https://duocpruebaazure3.onmicrosoft.com/2b2c5b78-e1fc-41e6-88e1-20d591febee0/access_as_user'], // <-- cambia esto
      account: account!
    };

    return from(this.msalService.instance.acquireTokenSilent(silentRequest))
      .pipe(
        mergeMap(result => {
          const token = result.accessToken;
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(authReq);
        })
      );
  }
}