import { Component, OnInit } from '@angular/core';
import { DogService } from '../dog.service';

interface BreedResponse {
  message: { [key: string]: string[] };
  status: string;
}

interface DogImageResponse {
  message: string;
  status: string;
}

interface CacheError extends Error {
  // คุณสามารถเพิ่ม property อื่นๆ ได้ที่นี่หากต้องการ
}

@Component({
  selector: 'app-breed-selector',
  templateUrl: './breed-selector.component.html',
  styleUrls: ['./breed-selector.component.css']
})
export class BreedSelectorComponent implements OnInit {
  message = {
    "affenpinscher": [],
    "african": [],
    "airedale": [],
    "akita": [],
};
breeds: string[] = Object.keys(this.message);
  selectedBreed: string = '';
  images: string[] = ['https://images.dog.ceo/breeds/pinscher-miniature/n02107312_5299.jpg'];
  isLoading: boolean = false;

  constructor(private dogService: DogService) {} //เรียก api จาก DogService

  ngOnInit(): void {
    this.loadBreeds();
    this.loadRandomDogImage();
  }

  loadBreeds(): void {
    this.dogService.getAllBreeds()
    .subscribe((response: BreedResponse) => {
      console.error('Response',response);
      this.breeds = Object.keys(response.message); //ดึงเอาคีย์ทั้งหมดจากอ็อบเจกต์ response.message มาเก็บไว้ในรูปแบบของ array
      console.log('Breed',this.breeds)
    },
  ); //คีย์เป็นชื่อพันธุ์สัตว์และค่าเป็นรายละเอียดของแต่ละพันธุ์
  }

  loadRandomDogImage(): void {
    this.isLoading = true; // เริ่มต้นการโหลด
    this.dogService.getRandomDogImage()
    .subscribe((response: DogImageResponse) => {
      this.images = [response.message];
      this.isLoading = false; // เสร็จสิ้นการโหลด
      console.log('Image',this.images);
    },
    (error) => {
      this.isLoading = false;
    });
    // this.isLoading = false;
  }

  onBreedSelect(breed: string): void {
    this.selectedBreed = breed;
    this.isLoading = true;
    console.log('loading',this.isLoading);
    if (this.selectedBreed ) {
      console.log(this.selectedBreed  )
      this.dogService.getBreedImages(this.selectedBreed)
      .subscribe((response: any) => {
        console.log('API Response:', response); // ใช้ดูโครงสร้างข้อมูลตอบกลับ
        const breedImages = response.message[1]; // รูปภาพของสายพันธุ์ที่เลือก
        console.log('Breed Images:', breedImages); // ตรวจสอบว่ามีข้อมูลรูปภาพอะไรบ้าง
        this.images = breedImages;
        console.log('Selected Image:', this.images);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      });
      // this.isLoading = false;
    } else {
      this.images = [];
       this.isLoading = false;
       console.log('error');
    }
  }
}
