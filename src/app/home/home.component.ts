import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  firstname: string = '';
  email: string = '';
  password: string = '';
  submitted: boolean = false;
  errormessage: string = '';
  errorFields: string[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.firstname = params['first'];
      this.email = params['email'];
      this.password = params['pass']; // หรือเป็น params['confirm_pass'] ขึ้นอยู่กับว่าคุณต้องการนำค่าไหนมาใช้
    });
  }


  go() {
    this.submitted = true;
    this.errorFields = [];

    // ตรวจสอบความถูกต้องของอีเมล
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.email)) {
      this.errorFields.push('Invalid email format');
    }

    // ตรวจสอบความยาวของรหัสผ่าน
    if (this.password.length < 8) {
      this.errorFields.push('Password length must be at least 8 characters');
    }

    if (this.errorFields.length > 0) {
      this.errormessage = this.errorFields.join(', ');
      return;
    }

    // รับค่าจากฟอร์มที่ผู้ใช้กรอก
    const email = this.email;
    const password = this.password;

    // เก็บค่าลงใน localStorage
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    console.log('Firstname:', this.firstname);
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    // ส่วนอื่นๆ ที่คุณต้องการให้ทำเมื่อกดปุ่ม Login
    // ตรวจสอบข้อมูล, เรียก API, หรืออื่นๆ
    // เมื่อทำเสร็จสามารถเปลี่ยนเส้นทางไปยังหน้าอื่นๆ ได้
    // this.router.navigate(['/booking']); // เป็นตัวอย่างการเปลี่ยนเส้นทางไปยังหน้า booking
    this.router.navigate(['/welcome']); // เปลี่ยนเส้นทางไปยังหน้า welcome เมื่อกดปุ่ม Login
  }

  goBack() {
    this.router.navigate(['/login']);
  }
  goToBooking() {
    this.router.navigate(['/booking']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
