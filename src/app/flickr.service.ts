import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  constructor(private http: HttpClient) { }

  private baseUrl = "https://www.flickr.com/services/rest/?";
  private key = "15b59d853f08419962d91b1454ee99de";


  // method to get the latest food images
  // from the api starts here.....
  getLatestFoodImages = (page: any) => {
    let myRes = this.http.get(this.baseUrl + 'method=flickr.photos.search&tags=food&safe_search=1&format=json&nojsoncallback=1&page=' + page + '&per_page=30&api_key=' + this.key);
    return myRes;
  }


  // method to get the information of
  // single image starts here....
  getImageInfo = (id: any) => {
    let myRes = this.http.get(this.baseUrl + 'method=flickr.photos.getInfo&format=json&nojsoncallback=1&photo_id=' + id + '&api_key=' + this.key);
    return myRes;
  }


  // method to set the local storage 
  // starts here...
  public setLocalStorage = (id: any, data: any) => {
    let a = []
    a.push(data)
    return localStorage.setItem(id, JSON.stringify(a));
  }


  // method to get data from the local Storage
  // starts here...
  public getLocalStorage = (id: any) => {
    return JSON.parse(localStorage.getItem(id))

  }
}
