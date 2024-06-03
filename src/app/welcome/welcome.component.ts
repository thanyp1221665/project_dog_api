import { Component, OnInit } from '@angular/core';
import { DogService } from '../dog.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface DogData {
  subBreeds: string[];
  breedImages: string[];
  subBreedImages: { [key: string]: string[] };
}

interface DogImageResponse {
  message: string[];
  status: string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  title = 'Dog Images';
  dogImage: string = 'https://images.dog.ceo/breeds/hound-basset/n02088238_11204.jpg';
  images: string[] = [];
  dogData: DogData | null = null;
  breeds: string[] = [];
  selectedBreed: string = '';
  isLoading: boolean = true;

  constructor(private dogService: DogService) {}

  ngOnInit(): void {
    this.loadCombinedData();
  }

  loadCombinedData(): void {
    this.isLoading = true; // เริ่มต้นการโหลด

    this.dogService.getDogImages().pipe(
      catchError((error: Error) => {
        this.CacheError(error);
        return of({ message: [], status: 'error' }); // ส่งคืนข้อมูลที่เป็นค่าเริ่มต้น หรือ เพื่อจับข้อผิดพลาดและส่งค่ากลับเป็นอ็อบเจกต์ที่มี message เป็นอาร์เรย์ว่าง และ status เป็น 'error'
      })
    ).subscribe((breedImagesData: DogImageResponse) => {
      console.log('API Response:', breedImagesData); // ใช้ดูโครงสร้างข้อมูลตอบกลับ
      const breedImages = breedImagesData.message; // รูปภาพของสายพันธุ์ที่เลือก
      console.log('Breed Images:', breedImages); // ตรวจสอบว่ามีข้อมูลรูปภาพอะไรบ้าง
      this.images = breedImages;
      this.loadRandomDogImage();
    }, (error: Error) => {
      this.CacheError(error);
    });
  }

  CacheError(error: Error): void {
    console.error('There was a cache error!', error.message);
    this.isLoading = false; // เสร็จสิ้นการโหลดแม้มีข้อผิดพลาด
  }

  loadRandomDogImage(): void {
    if (this.images.length > 0) {
      const randomImage = this.images[Math.floor(Math.random() * this.images.length)];
      this.dogImage = randomImage;
      console.log('Dog Images',this.dogImage);
    }
    this.isLoading = false; // เสร็จสิ้นการโหลด
  }

  refreshImage(): void {
    this.isLoading = true; // เริ่มต้นการโหลด
    this.loadRandomDogImage();
  }
}
