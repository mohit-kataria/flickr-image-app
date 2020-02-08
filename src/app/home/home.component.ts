import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../flickr.service';
import { Router, ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public imagesData: any;
  public currentPage: number = 1;
  public totalCount: number;
  public disableNext: boolean = false;
  public storageData: any;
  public finalData: any = [];

  constructor(private flickrService: FlickrService, public router: Router, public toastr: ToastrService) { }

  ngOnInit() {
    this.loadData();

  }


  // method to load data from api 
  // starts here...
  public loadData = () => {
    this.flickrService.getLatestFoodImages(this.currentPage).subscribe(
      apiResponse => {
        if (apiResponse['stat'] == "ok") {
          this.totalCount = apiResponse['photos'].total;
          this.imagesData = apiResponse['photos'].photo
          this.getRatings();
        }
        else {
          this.toastr.error(apiResponse['message'], "Error")
        }
      },
      error => {
        this.toastr.error('Some error occurred', 'Please Go Back')
        this.router.navigate(['**'])
      }
    )
  }


  // method to get ratings of image...
  public getRatings = () => {

    for (let i = 0; i < this.imagesData.length; i++) {
      this.storageData = this.flickrService.getLocalStorage(this.imagesData[i].id);
      if (this.storageData !== null) {
        this.imagesData[i].rating = this.storageData[0].ratings
      }
    }
  }

  // method to navigate to next page...
  public loadImage = (id: any) => {
    this.toastr.success('Please wait')
    this.router.navigate(['/image-info', id])
  }

  
  public nextPage = () => {
    if ((this.totalCount / 30) > this.currentPage + 1) {
      this.currentPage++;
      this.loadData();
    }
    else {
      console.log('next page else called')
      this.currentPage++;
      this.disableNext = true;
      this.loadData()
    }

  }

  
  public previousPage: any = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadData();
      this.disableNext = false;
    }
  }

}
