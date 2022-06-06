import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpHeaders } from '@angular/common/http';
import { isEmbeddedView } from '@angular/core/src/view/util';
import { isEmpty } from 'rxjs/operator/isEmpty';
import { Router } from '@angular/router'

@Component({
  selector: 'app-resturanttoken',
  templateUrl: './resturanttoken.component.html',
  styleUrls: ['./resturanttoken.component.css']
})
export class ResturanttokenComponent implements OnInit {
  perPage = [];
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
    this.perPage = [5, 15, 25, 50, 75, 100];
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
  displayData(perpage = this.perPage[0], sortfield = 'restaurant_name', sorttype = 'ASC', pageno = 1) {
    this.order = this.order == 'ASC' ? 'DESC' : 'ASC';
    this.error = null;
    if (this.dataservice.isdialogopen == false) {
      this.dataservice.openDialog();
      this.dataservice.isdialogopen = true;
    }
    this.dataservice.callapi("getAllTokenByAdmin",
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
          this.data = result.data.token_detail;
          this.total_record = result.data.total_record;
          if (result.data.token_detail.length == 0) {
            this.error = "No Data Found";
          }
           console.log('reach');
          this.dataservice.dialogref.close();
          this.dataservice.isdialogopen = false;
        }
      }).catch((err) => {
      });
  }
  reset() {
    this.searchqry = '';
    this.search = false;
    this.displayData();
  }
  searchuser(searchqry) {
    this.dataservice.openDialog();
    this.error = null;
   if (searchqry == '') {
      this.dataservice.dialogref.close();
      this.dataservice.openerrorSnackBar("Please Enter Search Query");
    }
    else {
      this.search = true;
      this.dataservice.callapi("searchRestaurantByAdmin",
        {
          "search_type": "restaurant_name",
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
            this.data = result.data.restaurant_detail;
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
