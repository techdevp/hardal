import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UsersService } from '../../../services/users/users.service';
import { LayoutService } from '../../../services/layout/layout.service';

@Component({
  selector: 'app-featured-interests',
  templateUrl: './featured-interests.component.html',
  styleUrls: ['./featured-interests.component.scss']
})
export class FeaturedInterestsComponent implements OnInit {
  data: any;
  access_token: any;
  featured_interest: any = [
    { _id: '', name: '', created: '' },
    { _id: '', name: '', created: '' },
    { _id: '', name: '', created: '' },
    { _id: '', name: '', created: '' },
    { _id: '', name: '', created: '' },
    { _id: '', name: '', created: '' },
    { _id: '', name: '', created: '' },
    { _id: '', name: '', created: '' },
    { _id: '', name: '', created: '' },
    { _id: '', name: '', created: '' }
  ];
  all_features: any = [];
  selected: any = [];
  interests: any;
  selectedInterest: any = [];
  old_interest: any;
  old_interest_name: any = [];
  interest_count: any;
  selected_layout: number = 0;

  constructor(private detectChange: ChangeDetectorRef, private spinnerService: Ng4LoadingSpinnerService, private _user: UsersService, private layoutService: LayoutService) {
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
    this.layoutService.interestCount(this.access_token)
      .then((data: any) => {
        this.spinnerService.hide()
        this.interest_count = data.data;
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
    this.spinnerService.show();
    this._user.getUserInterests()
      .then((data: any) => {
        this.interests = data;
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
    this._user.getTopInterests()
      .then((data: any) => {
        data.common_interests.forEach((item: any, index: any) => {
          this.featured_interest[index] = item;
          this.selectedInterest[index] = item.name;
          this.old_interest_name[index] = item.name;
        });
        this.all_features = this.featured_interest;
        // this.featured_interest = data.common_interests;
        this.spinnerService.hide()
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
  }

  ngOnInit() { }
  isdisabled(data: any) {
    let match = this.featured_interest.findIndex(x => x.name == data);
    if (match > -1) {
      return true;
    }
  }

  selectInterest(data: any, index: any) {
    let match = this.featured_interest.findIndex(x => x.name == data);
    this.spinnerService.show();
    if (match == -1) {
      let index1 = this.interests.findIndex(x => x.name == data)
      this.old_interest = this.featured_interest[index]._id;
      this.featured_interest[index] = this.interests[index1];
      let obj = {
        position: index + 1,
        from: this.old_interest,
        to: this.interests[index1]._id
      }
      this._user.changeInterestPosition(this.interests[index1]._id, obj)
        .then((data: any) => {
          this.spinnerService.hide()
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    }
    else {
      alert("You already set the interest  " + data);
      this.selectedInterest[index] = this.old_interest_name[index];
      this.detectChange.detectChanges();
      this.spinnerService.hide();
      if (!this.selectedInterest[index]) {
        this.selectedInterest[index] = ''
      }
    }
  }

  removeInterest(id: any, index: any) {
    let obj = {
      position: 0,
      from: '',
      to: id
    }
    this.spinnerService.show();
    this._user.changeInterestPosition(id, obj)
      .then((data: any) => {
        this.spinnerService.hide();
        let obj = { _id: '', name: '', created: '' };
        let index1 = this.interests.findIndex(x => x.name == this.featured_interest[index].name)
        console.log(index1, this.featured_interest[index].name, this.selectedInterest[index1])
        this.featured_interest[index] = obj;
        this.selectedInterest[index1] = '';

      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
  }
  searchInterest(search: any) {
    if (search) {
      this.featured_interest = [];
      this._user.searchCommonInterest(search, this.access_token)
        .then((data: any) => {
          this.spinnerService.hide();
          data.forEach((item: any, index: any) => {
            this.featured_interest.push(item);
            // this.selectedInterest[index] = item.name;
            for (var i = 0; i < this.featured_interest.length; i++) {
              let index = this.interests.findIndex(x => x.name == this.featured_interest[i].name);
              this.selectedInterest[i] = this.interests[index].name
            }
          })

        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    } else {
      this.featured_interest = this.all_features
    }
  }

  selectedvalues(event: any, data: any, selected: any, index: any) {
    if (selected) {
      this.featured_interest[index].checked = true;
      this.selected_layout = this.selected_layout + 1;
    }
    else {
      this.featured_interest[index].checked = false;
      this.selected_layout = this.selected_layout - 1;
    }
    console.log(event, data, selected);
  }
  print(): void {
    if (this.selected_layout > 0) {
      let printContents, popupWin;
      printContents = document.getElementById('print-section1').innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      popupWin.document.open();
      popupWin.document.write(`
        <html>
        <head>
        <title>Print tab</title>
        <style>
        //........Customized style.......
        </style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
        </html>`
      );
      popupWin.document.close();
    }
    else {
      alert("Please select elements to print")
    }
  }

  download() {
    if (this.selected_layout > 0) {
      var new_arr = [];
      var arrData = typeof this.featured_interest != 'object' ? JSON.parse(this.featured_interest) : this.featured_interest;
      var CSV = '';
      console.log(arrData)
      for (var i = 0; i < arrData.length; i++) {
        if (arrData[i].checked) {
          new_arr.push({ "ID": arrData[i]._id, "FILESIZE": arrData[i].filesize, "CREATED DATE": arrData[i].created })
        }
      }
      //This condition will generate the Label/Header

      var row = "";

      //This loop will extract the label from 1st index of on array
      for (var index in new_arr[0]) {
        //Now convert each value to string and comma-seprated
        row += index + ',';
      }
      row = row.slice(0, -1);
      //append Label row with line break
      CSV += row + '\r\n';

      //1st loop is to extract each row
      for (var i = 0; i < new_arr.length; i++) {
        var row = "";
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in new_arr[i]) {
          row += '"' + new_arr[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        //add a line break after each row
        CSV += row + '\r\n';
      }

      if (CSV == '') {
        alert("Invalid data");
        return;
      }

      //this trick will generate a temp "a" tag
      var link = document.createElement("a");

      //this part will append the anchor tag and remove it after automatic click
      document.body.appendChild(link);

      var csv = CSV;
      var blob = new Blob([csv], { type: 'text/csv' });
      var csvURL = window.URL.createObjectURL(blob);
      console.log(csvURL)
      var tempLink = document.createElement('a');
      tempLink.href = csvURL;
      tempLink.setAttribute('download', 'ActiveEvent_data.csv');
      tempLink.click();

    } else {
      alert("Please select layout to download.")
    }
  }
}
