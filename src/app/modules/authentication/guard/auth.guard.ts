import { CanActivateFn,CanActivate,Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { inject, Injectable } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoginIn() && auth.isAdmin()) {

    return true;   
  }
  else{
    router.navigate(['login']);
    return false;
  }

};