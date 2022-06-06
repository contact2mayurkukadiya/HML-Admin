import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpHeaders } from '@angular/common/http';
import { isEmbeddedView } from '@angular/core/src/view/util';
import { isEmpty } from 'rxjs/operator/isEmpty';
import { Router } from '@angular/router'
import { NgbModal, NgbModalRef, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-all-wallpaper',
  templateUrl: './all-wallpaper.component.html',
  styleUrls: ['./all-wallpaper.component.css']
})
export class AllWallpaperComponent implements OnInit {
  perPage = [];
  fileToUpload: File = null;
  per_page: any;
  error: any;
  total_wallpaper = 0;
  data = [];
  page = 1;
  delete_wallpaper_id: any;
  url: any;

  constructor(private dataservice: DataService, private router: Router) {
    this.perPage = [18, 25, 50, 75, 100];
    this.per_page = this.perPage[0];
    this.dataservice.openDialog();
    this.dataservice.isdialogopen = true;
  }


  ngOnInit() {
    if (localStorage.getItem('token') == null) {
      this.dataservice.dialogref.close();
      this.router.navigate(['/']);
    }

    this.displayData(this.perPage[0]);
  }
  displayData(perpage = this.perPage[0], pageno = 1) {

    this.error = null;
    if (this.dataservice.isdialogopen == false) {
      this.dataservice.openDialog();
      this.dataservice.isdialogopen = true;
    }
    this.dataservice.callapi("getAllWallpaperByAdmin",
      {
        "page": pageno,
        "item_count": perpage
      }, {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }, "http://192.168.0.110/wallpaper_backend/api/public/api/") // function parameter finish

      .then((result) => {
        if (result.code == 201) {
          this.error = result.message;
          this.dataservice.dialogref.close();
          this.dataservice.isdialogopen = false;
        }
        else {
          this.data = result.data.wallpaper_list;
          this.total_wallpaper = result.data.total_wallpaper;
          if (this.data.length == 0) {
            this.error = "No Data Found";
          }
          this.dataservice.dialogref.close();
          this.dataservice.isdialogopen = false;
        }
      }).catch((err) => {
      });
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    if (files && files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(files[0]);
    }
  }
  uploadFileToActivity() {
    console.log(this.fileToUpload);
    // console.log(this.fileToUpload.webkitRelativePath);
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);

    this.dataservice.callapi("addWallpaperByAdmin", formData, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }, "http://192.168.0.110/wallpaper_backend/api/public/api/").then(data => {
      // do something, if upload success
      this.url = "";
      this.dataservice.fileuploaderref.close();
      this.displayData();
    }, error => {
      console.log(error);
    });
  }
  storewallpaperid(event) {
    this.delete_wallpaper_id = event;
  }
  deletewallpaper(id) {
    console.log(id);
    if (this.dataservice.isdialogopen == false) {
      this.dataservice.openDialog();
      this.dataservice.isdialogopen = true;
    }
    this.dataservice.callapi("deleteWallpaperByAdmin",
      {
        "wallpaper_id": id
      }, {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }, "http://192.168.0.110/wallpaper_backend/api/public/api/") // function parameter finish

      .then((result) => {
        if (result.code == 201) {
          this.error = result.message;
          this.dataservice.dialogref.close();
          this.dataservice.isdialogopen = false;
        }
        else {

          this.dataservice.opensuccessSnackBar(result.message);
          this.dataservice.dialogref.close();
          this.dataservice.isdialogopen = false;
          this.displayData();
        }
      }).catch((err) => {
      });
  }
  openfileuploader(content) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.dataservice.openfileuploader(content, ngbModalOptions)
    this.dataservice.fileuploaderres.then((result: any) => {
      this.url = '';  // clear when model open successfully
      console.log(result);
    });
    // .then(result => {
    // if (result === ModalDismissReasons.ESC) {
    //   this.url = '';
    //   console.log(result);
    // }
    // else if (ModalDismissReasons.BACKDROP_CLICK) {
    //   this.url = '';
    // }
    // else {
    //   this.url = '';
    // }
    // });

  }
}
