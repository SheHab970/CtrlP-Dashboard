// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);

//   // Check if token exists in local storage and navigate to dashboard
//   const TOKEN = localStorage.getItem('TOKEN') || null;

//   if (TOKEN) {
//     router.navigate(['/dashboard']); // if does exist navigate to dashboard
//     return true;
//   } else {
//     return false; // if does not exist navigate prevent access
//   }
// };
