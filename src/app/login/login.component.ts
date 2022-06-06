import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../data.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private dataservice: DataService) {

  }
  isexist: any;
  ngOnInit() {
    this.isexist = localStorage.getItem('token');
    if (this.isexist != null) {
      if(this.dataservice.isdialogopen == true){
      this.dataservice.dialogref.close();
      this.dataservice.isdialogopen = false;
      }
      this.router.navigate(['userlist']);
    }
  }
  login_data = { email_id: "admin@gmail.com", password: "demo@123" };
  error = "";

  checkuser(login_data) {
    this.dataservice.openDialog();
    this.error = ""; // for remove error of previous wrong data
    if (login_data.email_id == '') {
      this.error = "Please Enter Email Address";
      this.dataservice.dialogref.close();
      this.dataservice.openerrorSnackBar(this.error);
    }
    else if (login_data.password == '') {
      this.error = "Please Enter Password";
      this.dataservice.dialogref.close();
      this.dataservice.openerrorSnackBar(this.error);
    }
    else {
      this.dataservice.callapi("doLoginForAdmin", login_data, {},"http://192.168.0.110/hmm_backend/api/public/api/")
        .then((result) => {
          console.log(result);
          if (result.code == 200) {
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('user_name', result.data.user_detail[0].user_name);
            localStorage.setItem('id', result.data.user_detail[0].user_id);
            localStorage.setItem('code', result.code);
            localStorage.setItem('message', result.message);
            this.router.navigate(["/subcategory"]);
            this.dataservice.dialogref.close();
          }
          else if (result.code == 201) {
            localStorage.setItem('code', result.code);
            localStorage.setItem('message', result.message);
            this.error = result.message;
            this.dataservice.dialogref.close();
            this.dataservice.openerrorSnackBar(this.error);
          }
          else {
            this.error = result.message;
            this.dataservice.openerrorSnackBar(this.error);
          }


          // if (result.code == 200) {
          //     localStorage.setItem('token', result.data.token);
          //     localStorage.setItem('user_name', result.data.user_detail.user_name);
          //     localStorage.setItem('id', result.data.user_detail.social_uid);
          //     localStorage.setItem('code', result.code);
          //     localStorage.setItem('message', result.message);      //  http://192.168.0.110/wallpaper_backend/api/public/api/
          //     this.router.navigate(["/allwallpaper"]);
          //     this.dataservice.dialogref.close();
          //   }
          //   else if (result.code == 201) {
          //     localStorage.setItem('code', result.code);
          //     localStorage.setItem('message', result.message);
          //     this.error = result.message;
          //     this.dataservice.dialogref.close();
          //     this.dataservice.openerrorSnackBar(this.error);
          //   }
          //   else {
          //     this.error = result.message;
          //     this.dataservice.openerrorSnackBar(this.error);
          //   }

          // if (result.code == 200) {
          //       localStorage.setItem('token', result.data.token);
          //       localStorage.setItem('user_name', result.data.user_detail.user_name);
          //       localStorage.setItem('id', result.data.user_detail.social_uid);
          //       localStorage.setItem('code', result.code);
          //       localStorage.setItem('message', result.message);      //  http://localhost/photo_editor_studio_pics_art_web/api/public/api/
          //       this.router.navigate(["/subcategory"]);
          //       this.dataservice.dialogref.close();
          //     }
          //     else if (result.code == 201) {
          //       localStorage.setItem('code', result.code);
          //       localStorage.setItem('message', result.message);
          //       this.error = result.message;
          //       this.dataservice.dialogref.close();
          //       this.dataservice.openerrorSnackBar(this.error);
          //     }
          //     else {
          //       this.error = result.message;
          //       this.dataservice.openerrorSnackBar(this.error);
          //     }

        }).catch((err) => {
        });
    }
  }
}
