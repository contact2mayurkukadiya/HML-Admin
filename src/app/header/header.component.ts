import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private dataservice: DataService) { }

  ngOnInit() {
  }
  option = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };
  logout() {
    this.dataservice.openDialog();
    return this.dataservice.callapi('doLogoutForAdmin', {}, this.option,'http://192.168.0.110/hmm_backend/api/public/api/')
      .then((result: any) => {
        if (result.code == 200) {
          localStorage.clear();
          this.dataservice.dialogref.close();
          this.router.navigate(['/']);
        }
        else{
          this.dataservice.dialogref.close();
          this.dataservice.openerrorSnackBar(result.message);
        }
      }, error => { console.log(error) });
  }
}
