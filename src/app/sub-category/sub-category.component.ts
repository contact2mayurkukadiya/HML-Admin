import { Component, OnInit, Optional } from '@angular/core';
import { DataService } from '../data.service';
import { HttpHeaders } from '@angular/common/http';
import { isEmbeddedView } from '@angular/core/src/view/util';
import { isEmpty } from 'rxjs/operator/isEmpty';
import { Router } from '@angular/router'
import { NgbModal, NgbModalRef, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  fileToUpload: File = null;
  error: any;
  total_record = 0;
  data = [];
  page = 1;
  delete_sub_category_id: any;
  url: any;
  subcatname: any;
  item_id : any;
  constructor(private dataservice: DataService, private router: Router) {


    this.dataservice.openDialog();
    this.dataservice.isdialogopen = true;
  }

  ngOnInit() {
    if (localStorage.getItem('token') == null) {
      this.dataservice.dialogref.close();
      this.router.navigate(['/']);
    }

    this.displayData();
  }
  displayData(pageno = 1) {

    this.error = null;
    if (this.dataservice.isdialogopen == false) {
      this.dataservice.openDialog();
      this.dataservice.isdialogopen = true;
    }
    this.dataservice.callapi("getSubCategoryByCategoryId",
      {
        "page": pageno,
        "category_id": 11
      }, {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }, "http://192.168.0.112/photo_editor_studio_pics_art_web/api/public/api/") // function parameter finish

      .then((result) => {
        if (result.code == 201) {
          this.error = result.message;
          this.dataservice.dialogref.close();
          this.dataservice.isdialogopen = false;
        }
        else {
          this.data = result.data.category_list;
          this.total_record = result.data.total_record;
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
    console.log('call');
    this.fileToUpload = files.item(0);
    if (files && files[0]) {
      console.log('file = ', files[0]);
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
        console.log('url = ' + this.url);
      }
      reader.readAsDataURL(files[0]);
      console.log('reader = ' + reader);
    }
  }
  addsubcategory() {
    console.log(this.fileToUpload);
    // console.log(this.fileToUpload.webkitRelativePath);
    let tmp = {
      "category_id": 11,
      "name": this.subcatname
    };
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('request_data', JSON.stringify(tmp));

    console.log(tmp);
    this.dataservice.callapi("addSubCategory", formData, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }, "http://192.168.0.112/photo_editor_studio_pics_art_web/api/public/api/").then(data => {
      // do something, if upload success
      this.url = "";
      this.dataservice.fileuploaderref.close();
      this.displayData();
    }, error => {
      console.log(error);
    });
  }
  storesubcatid(event) {
    this.delete_sub_category_id = event;
  }
  deletesubcategory(id) {
    console.log(id);
    if (this.dataservice.isdialogopen == false) {
      this.dataservice.openDialog();
      this.dataservice.isdialogopen = true;
    }
    this.dataservice.callapi("deleteSubCategory",
      {
        "sub_category_id": id
      }, {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }, "http://192.168.0.112/photo_editor_studio_pics_art_web/api/public/api/") // function parameter finish

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
  updatesubcategory() {
    this.dataservice.openDialog();
    this.dataservice.isdialogopen = true;
    let tmp = {
      "sub_category_id": this.item_id,
      "name": this.subcatname
    };
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('request_data', JSON.stringify(tmp));

    console.log(tmp);
    this.dataservice.callapi("updateSubCategory", formData, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }, "http://192.168.0.112/photo_editor_studio_pics_art_web/api/public/api/").then(data => {
      // do something, if upload success
      this.url = "";
      this.item_id = '';
      this.subcatname = '';
      this.dataservice.dialogref.close();
      this.dataservice.isdialogopen = false;
      this.dataservice.fileuploaderref.close();
      this.displayData();
    }, error => {
      console.log(error);
    });
  }
  openfileuploader(content, item:any) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      centered: true
    };
    if (item) {
      this.url = item.thumbnail_img;  // clear when model open successfully
      this.subcatname = item.name;
      this.item_id = item.sub_category_id;
      console.log(this.url);
      console.log(this.subcatname);
    }
    this.dataservice.openfileuploader(content, ngbModalOptions)
    // this.dataservice.fileuploaderref.then((result: any) => {
      
    this.dataservice.fileuploaderres.then((result: any) => {
      // console.log(result);
      if (!item) {
        this.url = '';
      }
      // console.log(result);
    });
  }
}
