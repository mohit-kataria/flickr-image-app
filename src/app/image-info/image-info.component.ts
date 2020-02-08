import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlickrService } from '../flickr.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image-info',
  templateUrl: './image-info.component.html',
  styleUrls: ['./image-info.component.css']
})
export class ImageInfoComponent implements OnInit {

  public imageData: any;
  public ratings: any;
  public ratingBy: any;
  public description: any;

  constructor(private flickrService: FlickrService, public route: ActivatedRoute, public router: Router, public toastr: ToastrService) { }

  ngOnInit() {
    let myId = this.route.snapshot.paramMap.get("id")
    this.flickrService.getImageInfo(myId).subscribe(
      apiResponse => {
        if (apiResponse['stat'] == "ok") {
          this.imageData = apiResponse['photo']
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


  // method to submit the form imageData
  // to store to local storage
  public submit = () => {
    let storageData: any = {
      "ratings": this.ratings,
      "ratingBy": this.ratingBy,
      "description": this.description
    }
    this.flickrService.setLocalStorage(this.imageData.id, storageData);
    this.toastr.success('Please wait', "Success")
    setTimeout(() => {
      this.router.navigate(['/'])
    }, 1000)
  }

}
