import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PreloaderComponent } from './preloader/preloader.component';
import { AnimationStyleMetadata } from '@angular/animations';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadingComponent } from './file-uploading/file-uploading.component';

@Injectable()
export class DataService {

  base_url: any = "http://192.168.0.110/hmm_backend/api/public/api/";
  token: any;
  new_token: any;
  dialogref: any;
  isdialogopen: boolean;
  fileuploaderref: NgbModalRef;
  fileuploaderres: any;
  constructor(private router: Router, private http: HttpClient, private dialog: MatDialog, public snackBar: MatSnackBar, private modalService: NgbModal) { }

  openDialog() {
    this.isdialogopen = false;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialogref = this.dialog.open(PreloaderComponent, dialogConfig);
  }

  openerrorSnackBar(message: string) {
    let config = new MatSnackBarConfig();
    config.extraClasses = ['errsnakbar'];
    config.duration = 3000;
    this.snackBar.open(message, '', config);
  }
  opensuccessSnackBar(message: string) {
    let config = new MatSnackBarConfig();
    config.extraClasses = ['errsnakbar', 'sucsnakbar'];
    config.duration = 3000;
    this.snackBar.open(message, '', config);
  }
  openfileuploader(content, ngbModalOptions: Optional) {
    console.log(content);
    this.fileuploaderref = this.modalService.open(content, ngbModalOptions); //  return type nbgmodelref
    this.fileuploaderres = this.fileuploaderref.result.then((result:any) => { //  return type promise
      console.log('abc');
    return result },(reason) => { return reason;});

  }
  callapi(q, object, header, base_url = "http://192.168.0.110/hmm_backend/api/public/api/"): Promise<any> {
    this.token = localStorage.getItem('token');
    return this.http.post(base_url + q, object, header)
      .toPromise()
      .then((result: any) => {
        //console.log(result);

        if (result.code == 400) {
          localStorage.removeItem('token');
          this.dialogref.close();
          this.router.navigate(['/']);
        }
        else if (result.code == 401) {
          this.new_token = result.data.new_token;
          localStorage.setItem('token', this.new_token);
          return this.callapi(q, object, header);
        }
        else {
          //console.log("data", result);
          return result;
        }

      }, error => { console.log(error); });

  }
}
