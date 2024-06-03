import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  private subBreedsUrl = 'https://dog.ceo/api/breed/hound/list';
  private breedImagesUrl = 'https://dog.ceo/api/breed/hound/images';
  private randomApiUrl = 'https://dog.ceo/api/breeds/image/random';
  private allBreedsUrl = 'https://dog.ceo/api/breeds/list/all';

  constructor(private http: HttpClient) { }

  getDogImages(): Observable<any> {
    return this.http.get<any>(this.breedImagesUrl);
  }

  getSubBreeds(): Observable<any> {
    return this.http.get<any>(this.subBreedsUrl);
  }

  getRandomDogImage(): Observable<any> {
    return this.http.get<any>(this.randomApiUrl);
  }

  getSubBreedImages(subBreed: string): Observable<any> {
    const subBreedUrl = `https://dog.ceo/api/breed/hound/${subBreed}/images`;
    return this.http.get<any>(subBreedUrl);
  }
  getAllBreeds(): Observable<any> {
    return this.http.get<any>(this.allBreedsUrl);
  }
  getBreedImages(breed: string): Observable<any> {
    const breedImagesUrl = `https://dog.ceo/api/breed/${breed}/images`;
    return this.http.get<any>(breedImagesUrl);
  }
}
