import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    if (email  && password && email=="thanyaporn.sae@ku.th") {

      return true; // Allow access to the route
    } else {
      this.router.navigate(['/login']); // Redirect to login page
      return false;
    }
  }
}
