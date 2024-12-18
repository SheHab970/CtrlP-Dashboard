import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

export const customInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService);
  const respons_token = auth.getToken();

  const cloneReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${respons_token}`
    }
  })
  
  return next(cloneReq);
};
