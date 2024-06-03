import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login(): void {


    this.router.navigate(['/home']);
  }

  register(): void {
    // ส่งผ่านไปยังหน้าลงทะเบียนทันที
    this.router.navigate(['/register']);
  }

}
