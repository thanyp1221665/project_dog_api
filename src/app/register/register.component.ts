import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router) {}

  title = 'register';
  first: string = '';
  last: string = '';
  age: string = '';
  gender: string = '';
  email: string = '';
  phone: string = '';
  pass: string = '';
  confirm_pass: string = '';
  errormessage: string = '';
  errorFields: string[] = [];
  submitted: boolean = false; // เพิ่มตัวแปร submitted เพื่อตรวจสอบว่า user ได้กดปุ่ม Register หรือไม่

  numberOnly(event: any, type: string) {
    const value = event.target.value; //รับค่าจากคีย์บอร์ด

    // อนุญาตให้ใช้ปุ่ม Backspace, Delete, Tab, และลูกศร
    if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      return;
    }
    // ตรวจสอบว่าคีย์ที่กดเป็นตัวเลขหรือไม่
    if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(event.key)) {
      // หากไม่ใช่ตัวเลข ให้ยกเลิกการป้อนข้อมูล
      event.preventDefault();
    }
    // ถ้าเป็นช่องกรอก "age" ให้ตรวจสอบความยาวของตัวเลข
    if (type === 'age' && value.length >= 3) {
      event.preventDefault();
    }
    // ถ้าเป็นช่องกรอก "phone" ให้ตรวจสอบความยาวของตัวเลข
    if (type === 'phone' && value.length >= 10) {
      event.preventDefault();
    }
  }

  adduser() {
    this.submitted = true; // เมื่อกดปุ่ม Register ก็เปลี่ยนค่าตัวแปร submitted เป็น true
    this.errorFields = []; // รีเซ็ตค่า errorFields เพื่อให้ข้อความแสดงผลถูกต้องตามเงื่อนไขที่ถูกต้อง

    // ตรวจสอบข้อมูลที่ไม่ถูกต้องและเพิ่มใน errorFields
    if (this.pass === '' || this.confirm_pass === '' || this.email === '' || this.phone === '' || this.age === '' || this.last === '' || this.first === '' || this.gender === '') {
        if (this.pass === '') this.errorFields.push('Password');
        if (this.confirm_pass === '') this.errorFields.push('Confirm Password');
        if (this.email === '') this.errorFields.push('Email');
        if (this.phone === '' || this.phone.length !== 10) this.errorFields.push('Phone');
        if (this.age === '') this.errorFields.push('Age');
        if (this.last === '') this.errorFields.push('Lastname');
        if (this.first === '') this.errorFields.push('Firstname');
        if (this.gender === '') this.errorFields.push('Gender');
    }

    // ตรวจสอบข้อมูลที่ไม่ถูกต้องและแสดงข้อความแจ้งเตือนเฉพาะกล่อง input หลังจากกดปุ่ม Register
    if (this.errorFields.length > 0) {
      this.errorFields.forEach(field => {
        const inputField = document.getElementById(field.toLowerCase()) as HTMLInputElement;
        if (inputField) {
          inputField.classList.add('error-border');
        }
      });
      return;
    }

    // ตรวจสอบความถูกต้องของอีเมล
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.email)) {
      alert('Invalid email format');
      return;
    }

    // ตรวจสอบความเท่าเคียงของรหัสผ่าน
    if (this.pass !== this.confirm_pass) {
      alert('Passwords do not match');
      this.pass = '';
      this.confirm_pass = ''; // เมื่อ pass และ cofirmpass ไม่ตรงกันจะถูกรีเซ็ตเป็นค่าว่าง
      const passInput = document.getElementById('password') as HTMLInputElement;
      if (passInput) {
        passInput.focus(); // เพื่อให้โฟกัสเฉพาะจุด
      }
      return;
    }

    // ตรวจสอบความยาวของรหัสผ่าน
    if (this.pass.length < 8) {
      alert('Password length must be at least 8 characters');
      return;
    }

    // แสดงข้อความใน console และนำไปยังหน้า home หากข้อมูลถูกต้อง
    console.log('Firstname : ', this.first);
    console.log('Lastname : ', this.last);
    console.log('Age : ', this.age);
    console.log('Gender : ', this.gender);
    console.log('Email : ', this.email);
    console.log('Phone : ', this.phone);
    console.log('Pass : ', this.pass);
    console.log('Confirm pass : ', this.confirm_pass);

    this.router.navigate(['/home'], {
      state: {
        first: this.first,
        last: this.last,
        age: this.age,
        gender: this.gender,
        email: this.email,
        phone: this.phone
      }
    });
  }

  // รีเซ็ตค่าทุกฟิลด์และ errorFields เมื่อกดปุ่ม Clear Form
  clearForm() {
    this.first = '';
    this.last = '';
    this.age = '';
    this.gender = '';
    this.email = '';
    this.phone = '';
    this.pass = '';
    this.confirm_pass = '';
    this.errorFields = [];
    this.submitted = false; // เมื่อกดปุ่ม Clear Form ก็เปลี่ยนค่าตัวแปร submitted เป็น false
  }

  // ฟังก์ชัน goBack() เพื่อเปลี่ยนเส้นทางกลับไปหน้า login
  goBack() {
    this.router.navigate(['/login']);
  }
}
