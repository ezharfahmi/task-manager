import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  
  const userRole = localStorage.getItem('role');
  const router = inject(Router);

  if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
    router.navigateByUrl('404-not-found');
    return false;
  }else{
    return true;
  }
  
};
