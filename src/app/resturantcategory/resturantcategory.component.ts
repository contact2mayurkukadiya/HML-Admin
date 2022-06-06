import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpHeaders } from '@angular/common/http';
import { isEmbeddedView } from '@angular/core/src/view/util';
import { isEmpty } from 'rxjs/operator/isEmpty';
import { Router } from '@angular/router'

@Component({
  selector: 'app-resturantcategory',
  templateUrl: './resturantcategory.component.html',
  styleUrls: ['./resturantcategory.component.css']
})
export class ResturantcategoryComponent implements OnInit {
  perPage = [];
  searchType = [];
  search_type: string = '';
  per_page: any;
  error: any;
  searchqry = "";
  search = false;
  users = 0;
  data = [];
  total_record: any;
  order = 'ASC';
  page = 1;

  constructor(private dataservice: DataService, private router: Router) {
    this.perPage = [5,15, 25, 50, 75, 100];
    this.per_page = this.perPage[0];
    this.searchType = [
      { key: 'user_name', value: 'Name' },
      { key: 'email_id', value: 'Email Id' },
      { key: 'phone_no', value: 'Phone No' },
      { key: 'create_time', value: 'Signup Time' },
    ];
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
  displayData(perpage = this.perPage[0], sortfield = 'user_name', sorttype = 'ASC', pageno = 1) {
    this.order = this.order == 'ASC' ? 'DESC' : 'ASC';
    this.error = null;
    if (this.dataservice.isdialogopen == false) {
      this.dataservice.openDialog();
      this.dataservice.isdialogopen = true;
    }
    this.dataservice.callapi("getAllUserByAdmin",
      {
        "page": pageno,
        "item_count": perpage,
        "order_by": sortfield,
        "order_type": sorttype

      }, {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }) // function parameter finish

      .then((result) => {
        if (result.code == 201) {

          this.error = result.message;
          this.dataservice.dialogref.close();
          this.dataservice.isdialogopen = false;
        }
        else {
          this.data = result.data.user_detail;
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
  reset() {
    this.searchqry = '';
    this.search_type = '';
    this.search = false;
    this.displayData();
  }
  searchuser(searchtype, searchqry) {
    this.dataservice.openDialog();
    this.error = null;
    if (searchtype == '') {
      this.dataservice.dialogref.close();
      this.dataservice.openerrorSnackBar("Please Select Search Field");
    }
    else if (searchqry == '') {
      this.dataservice.dialogref.close();
      this.dataservice.openerrorSnackBar("Please Enter Search Query");
    }
    else {
      this.search = true;
      this.dataservice.callapi("searchUserForAdmin",
        {
          "search_type": searchtype,
          "search_query": searchqry
        }, {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          })
        }) // function parameter finish

        .then((result) => {
          if (result.code == 201) {

            this.error = result.message;
            this.dataservice.dialogref.close();
          }
          else {
            this.data = result.data.user_detail;
            if (this.data.length == 0) {
              this.error = "No Data Found";
            }
            this.dataservice.dialogref.close();
          }
        }).catch((err) => {
        });
    }
  }

}
