import { Component, OnInit } from '@angular/core';
import { HashtagService } from '../../../services/hashtag/hashtag.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Pipe, ChangeDetectorRef } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-new-hashtag',
  templateUrl: './new-hashtag.component.html',
  styleUrls: ['./new-hashtag.component.scss']
})
export class NewHashtagComponent implements OnInit {
  countries: any;
  hashtags: any = [];
  access_token: any;
  data: any;
  temp_object: any = {
    all: false,
    dec_id: false,
    inc_id: false,
    dec_db: false,
    inc_db: false,
    dec_created_date: false,
    inc_created_date: false,
    user_inc: false,
    user_dec: false,
    edit_date: false,
    used_post_dec: false,
    used_post_inc: false,
    status_active: false,
    status_passive: false,
    platform_dec: false,
    platform_inc: false,
    ios: false,
    android: false,
    browser: false
  };
  show_msg: any;
  order: String = '';
  orderby: String = "created";
  hashtag_text: any = '';
  language: any = ['English', 'Spanish', 'Turkish', 'Portuguese'];
  hashtag_name: any;
  selectedCountry: any;
  selectedLanguage: any;
  count: number = 0;
  page_count: number;
  pages: any = [];
  current_page: number = 0;
  last_page: number = 0;
  index: any;
  total_count: any;

  constructor(private ref: ChangeDetectorRef, public router: Router, private hashtagservice: HashtagService, private spinnerService: Ng4LoadingSpinnerService, ) {
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
    this.order = 'true';
    this.orderby = 'created';
    this.spinnerService.show();
    this.hashtagservice.allHashtag(this.access_token, this.count)
      .then((data: any) => {
        console.log("data", data);
        this.spinnerService.hide()
        this.hashtags = data.data.hashTags;
        this.page_count = Math.ceil(data.data.count / 10);
        this.total_count = data.data.count;
        this.current_page = this.current_page + 1;
        this.last_page = this.last_page + 1;
        var i = 1;
        while (this.page_count > 0) {
          this.pages.push(i);
          i++;
          this.page_count--;
          console.log(this.page_count, this.pages)
        }
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });

    this.countries = [
      { name: 'Afghanistan', code: 'AF' },
      { name: 'Åland Islands', code: 'AX' },
      { name: 'Albania', code: 'AL' },
      { name: 'Algeria', code: 'DZ' },
      { name: 'American Samoa', code: 'AS' },
      { name: 'AndorrA', code: 'AD' },
      { name: 'Angola', code: 'AO' },
      { name: 'Anguilla', code: 'AI' },
      { name: 'Antarctica', code: 'AQ' },
      { name: 'Antigua and Barbuda', code: 'AG' },
      { name: 'Argentina', code: 'AR' },
      { name: 'Armenia', code: 'AM' },
      { name: 'Aruba', code: 'AW' },
      { name: 'Australia', code: 'AU' },
      { name: 'Austria', code: 'AT' },
      { name: 'Azerbaijan', code: 'AZ' },
      { name: 'Bahamas', code: 'BS' },
      { name: 'Bahrain', code: 'BH' },
      { name: 'Bangladesh', code: 'BD' },
      { name: 'Barbados', code: 'BB' },
      { name: 'Belarus', code: 'BY' },
      { name: 'Belgium', code: 'BE' },
      { name: 'Belize', code: 'BZ' },
      { name: 'Benin', code: 'BJ' },
      { name: 'Bermuda', code: 'BM' },
      { name: 'Bhutan', code: 'BT' },
      { name: 'Bolivia', code: 'BO' },
      { name: 'Bosnia and Herzegovina', code: 'BA' },
      { name: 'Botswana', code: 'BW' },
      { name: 'Bouvet Island', code: 'BV' },
      { name: 'Brazil', code: 'BR' },
      { name: 'British Indian Ocean Territory', code: 'IO' },
      { name: 'Brunei Darussalam', code: 'BN' },
      { name: 'Bulgaria', code: 'BG' },
      { name: 'Burkina Faso', code: 'BF' },
      { name: 'Burundi', code: 'BI' },
      { name: 'Cambodia', code: 'KH' },
      { name: 'Cameroon', code: 'CM' },
      { name: 'Canada', code: 'CA' },
      { name: 'Cape Verde', code: 'CV' },
      { name: 'Cayman Islands', code: 'KY' },
      { name: 'Central African Republic', code: 'CF' },
      { name: 'Chad', code: 'TD' },
      { name: 'Chile', code: 'CL' },
      { name: 'China', code: 'CN' },
      { name: 'Christmas Island', code: 'CX' },
      { name: 'Cocos (Keeling) Islands', code: 'CC' },
      { name: 'Colombia', code: 'CO' },
      { name: 'Comoros', code: 'KM' },
      { name: 'Congo', code: 'CG' },
      { name: 'Congo, The Democratic Republic of the', code: 'CD' },
      { name: 'Cook Islands', code: 'CK' },
      { name: 'Costa Rica', code: 'CR' },
      { name: 'Cote D\'Ivoire', code: 'CI' },
      { name: 'Croatia', code: 'HR' },
      { name: 'Cuba', code: 'CU' },
      { name: 'Cyprus', code: 'CY' },
      { name: 'Czech Republic', code: 'CZ' },
      { name: 'Denmark', code: 'DK' },
      { name: 'Djibouti', code: 'DJ' },
      { name: 'Dominica', code: 'DM' },
      { name: 'Dominican Republic', code: 'DO' },
      { name: 'Ecuador', code: 'EC' },
      { name: 'Egypt', code: 'EG' },
      { name: 'El Salvador', code: 'SV' },
      { name: 'Equatorial Guinea', code: 'GQ' },
      { name: 'Eritrea', code: 'ER' },
      { name: 'Estonia', code: 'EE' },
      { name: 'Ethiopia', code: 'ET' },
      { name: 'Falkland Islands (Malvinas)', code: 'FK' },
      { name: 'Faroe Islands', code: 'FO' },
      { name: 'Fiji', code: 'FJ' },
      { name: 'Finland', code: 'FI' },
      { name: 'France', code: 'FR' },
      { name: 'French Guiana', code: 'GF' },
      { name: 'French Polynesia', code: 'PF' },
      { name: 'French Southern Territories', code: 'TF' },
      { name: 'Gabon', code: 'GA' },
      { name: 'Gambia', code: 'GM' },
      { name: 'Georgia', code: 'GE' },
      { name: 'Germany', code: 'DE' },
      { name: 'Ghana', code: 'GH' },
      { name: 'Gibraltar', code: 'GI' },
      { name: 'Greece', code: 'GR' },
      { name: 'Greenland', code: 'GL' },
      { name: 'Grenada', code: 'GD' },
      { name: 'Guadeloupe', code: 'GP' },
      { name: 'Guam', code: 'GU' },
      { name: 'Guatemala', code: 'GT' },
      { name: 'Guernsey', code: 'GG' },
      { name: 'Guinea', code: 'GN' },
      { name: 'Guinea-Bissau', code: 'GW' },
      { name: 'Guyana', code: 'GY' },
      { name: 'Haiti', code: 'HT' },
      { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
      { name: 'Holy See (Vatican City State)', code: 'VA' },
      { name: 'Honduras', code: 'HN' },
      { name: 'Hong Kong', code: 'HK' },
      { name: 'Hungary', code: 'HU' },
      { name: 'Iceland', code: 'IS' },
      { name: 'India', code: 'IN' },
      { name: 'Indonesia', code: 'ID' },
      { name: 'Iran, Islamic Republic Of', code: 'IR' },
      { name: 'Iraq', code: 'IQ' },
      { name: 'Ireland', code: 'IE' },
      { name: 'Isle of Man', code: 'IM' },
      { name: 'Israel', code: 'IL' },
      { name: 'Italy', code: 'IT' },
      { name: 'Jamaica', code: 'JM' },
      { name: 'Japan', code: 'JP' },
      { name: 'Jersey', code: 'JE' },
      { name: 'Jordan', code: 'JO' },
      { name: 'Kazakhstan', code: 'KZ' },
      { name: 'Kenya', code: 'KE' },
      { name: 'Kiribati', code: 'KI' },
      { name: 'Korea, Democratic People\'S Republic of', code: 'KP' },
      { name: 'Korea, Republic of', code: 'KR' },
      { name: 'Kuwait', code: 'KW' },
      { name: 'Kyrgyzstan', code: 'KG' },
      { name: 'Lao People\'S Democratic Republic', code: 'LA' },
      { name: 'Latvia', code: 'LV' },
      { name: 'Lebanon', code: 'LB' },
      { name: 'Lesotho', code: 'LS' },
      { name: 'Liberia', code: 'LR' },
      { name: 'Libyan Arab Jamahiriya', code: 'LY' },
      { name: 'Liechtenstein', code: 'LI' },
      { name: 'Lithuania', code: 'LT' },
      { name: 'Luxembourg', code: 'LU' },
      { name: 'Macao', code: 'MO' },
      { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
      { name: 'Madagascar', code: 'MG' },
      { name: 'Malawi', code: 'MW' },
      { name: 'Malaysia', code: 'MY' },
      { name: 'Maldives', code: 'MV' },
      { name: 'Mali', code: 'ML' },
      { name: 'Malta', code: 'MT' },
      { name: 'Marshall Islands', code: 'MH' },
      { name: 'Martinique', code: 'MQ' },
      { name: 'Mauritania', code: 'MR' },
      { name: 'Mauritius', code: 'MU' },
      { name: 'Mayotte', code: 'YT' },
      { name: 'Mexico', code: 'MX' },
      { name: 'Micronesia, Federated States of', code: 'FM' },
      { name: 'Moldova, Republic of', code: 'MD' },
      { name: 'Monaco', code: 'MC' },
      { name: 'Mongolia', code: 'MN' },
      { name: 'Montserrat', code: 'MS' },
      { name: 'Morocco', code: 'MA' },
      { name: 'Mozambique', code: 'MZ' },
      { name: 'Myanmar', code: 'MM' },
      { name: 'Namibia', code: 'NA' },
      { name: 'Nauru', code: 'NR' },
      { name: 'Nepal', code: 'NP' },
      { name: 'Netherlands', code: 'NL' },
      { name: 'Netherlands Antilles', code: 'AN' },
      { name: 'New Caledonia', code: 'NC' },
      { name: 'New Zealand', code: 'NZ' },
      { name: 'Nicaragua', code: 'NI' },
      { name: 'Niger', code: 'NE' },
      { name: 'Nigeria', code: 'NG' },
      { name: 'Niue', code: 'NU' },
      { name: 'Norfolk Island', code: 'NF' },
      { name: 'Northern Mariana Islands', code: 'MP' },
      { name: 'Norway', code: 'NO' },
      { name: 'Oman', code: 'OM' },
      { name: 'Pakistan', code: 'PK' },
      { name: 'Palau', code: 'PW' },
      { name: 'Palestinian Territory, Occupied', code: 'PS' },
      { name: 'Panama', code: 'PA' },
      { name: 'Papua New Guinea', code: 'PG' },
      { name: 'Paraguay', code: 'PY' },
      { name: 'Peru', code: 'PE' },
      { name: 'Philippines', code: 'PH' },
      { name: 'Pitcairn', code: 'PN' },
      { name: 'Poland', code: 'PL' },
      { name: 'Portugal', code: 'PT' },
      { name: 'Puerto Rico', code: 'PR' },
      { name: 'Qatar', code: 'QA' },
      { name: 'Reunion', code: 'RE' },
      { name: 'Romania', code: 'RO' },
      { name: 'Russian Federation', code: 'RU' },
      { name: 'RWANDA', code: 'RW' },
      { name: 'Saint Helena', code: 'SH' },
      { name: 'Saint Kitts and Nevis', code: 'KN' },
      { name: 'Saint Lucia', code: 'LC' },
      { name: 'Saint Pierre and Miquelon', code: 'PM' },
      { name: 'Saint Vincent and the Grenadines', code: 'VC' },
      { name: 'Samoa', code: 'WS' },
      { name: 'San Marino', code: 'SM' },
      { name: 'Sao Tome and Principe', code: 'ST' },
      { name: 'Saudi Arabia', code: 'SA' },
      { name: 'Senegal', code: 'SN' },
      { name: 'Serbia and Montenegro', code: 'CS' },
      { name: 'Seychelles', code: 'SC' },
      { name: 'Sierra Leone', code: 'SL' },
      { name: 'Singapore', code: 'SG' },
      { name: 'Slovakia', code: 'SK' },
      { name: 'Slovenia', code: 'SI' },
      { name: 'Solomon Islands', code: 'SB' },
      { name: 'Somalia', code: 'SO' },
      { name: 'South Africa', code: 'ZA' },
      { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
      { name: 'Spain', code: 'ES' },
      { name: 'Sri Lanka', code: 'LK' },
      { name: 'Sudan', code: 'SD' },
      { name: 'Suriname', code: 'SR' },
      { name: 'Svalbard and Jan Mayen', code: 'SJ' },
      { name: 'Swaziland', code: 'SZ' },
      { name: 'Sweden', code: 'SE' },
      { name: 'Switzerland', code: 'CH' },
      { name: 'Syrian Arab Republic', code: 'SY' },
      { name: 'Taiwan, Province of China', code: 'TW' },
      { name: 'Tajikistan', code: 'TJ' },
      { name: 'Tanzania, United Republic of', code: 'TZ' },
      { name: 'Thailand', code: 'TH' },
      { name: 'Timor-Leste', code: 'TL' },
      { name: 'Togo', code: 'TG' },
      { name: 'Tokelau', code: 'TK' },
      { name: 'Tonga', code: 'TO' },
      { name: 'Trinidad and Tobago', code: 'TT' },
      { name: 'Tunisia', code: 'TN' },
      { name: 'Turkey', code: 'TR' },
      { name: 'Turkmenistan', code: 'TM' },
      { name: 'Turks and Caicos Islands', code: 'TC' },
      { name: 'Tuvalu', code: 'TV' },
      { name: 'Uganda', code: 'UG' },
      { name: 'Ukraine', code: 'UA' },
      { name: 'United Arab Emirates', code: 'AE' },
      { name: 'United Kingdom', code: 'GB' },
      { name: 'United States', code: 'US' },
      { name: 'United States Minor Outlying Islands', code: 'UM' },
      { name: 'Uruguay', code: 'UY' },
      { name: 'Uzbekistan', code: 'UZ' },
      { name: 'Vanuatu', code: 'VU' },
      { name: 'Venezuela', code: 'VE' },
      { name: 'Viet Nam', code: 'VN' },
      { name: 'Virgin Islands, British', code: 'VG' },
      { name: 'Virgin Islands, U.S.', code: 'VI' },
      { name: 'Wallis and Futuna', code: 'WF' },
      { name: 'Western Sahara', code: 'EH' },
      { name: 'Yemen', code: 'YE' },
      { name: 'Zambia', code: 'ZM' },
      { name: 'Zimbabwe', code: 'ZW' }
    ];
  }

  ngOnInit() {
  }

  changeStatus(id: any, index: any, status: any) {
    console.log(index, this.hashtags[index].status);
    let index1 = this.hashtags.findIndex(x => x._id == id)
    if (this.hashtags[index1].status) {
      this.hashtags[index1].status = false;
    }
    else {
      this.hashtags[index1].status = true;
    }
    this.ref.detectChanges();
    console.log(index1, index, this.hashtags[index1])
    this.editHashtag(this.hashtags[index1], index1);
  }

  editHashtag(hashtags: any, index: any) {
    console.log("edit", hashtags)
    this.spinnerService.show();
    this.hashtagservice.editHashtag(hashtags, this.access_token, hashtags._id)
      .then((data: any) => {
        this.spinnerService.hide();
        // this.hashtags[index] = data.data
        console.log("updated", data)
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
  }

  findPrev(value: any) {
    console.log("find prev");
    if (value) {
      this.count = value * 10 - 10;
      this.current_page = value + 1;
    } else if (this.count > 0) {
      this.count = this.count - 10;
      console.log("count", this.count)
    }
    else {
      return
    }
    if (this.count >= 0) {
      this.spinnerService.show();
      this.hashtagservice.allHashtag(this.access_token, this.count)
        .then((data: any) => {
          console.log("data", data);
          this.spinnerService.hide()
          if (data.data.hashTags.length) {
            this.hashtags = data.data.hashTags;
            this.current_page = this.current_page - 1;
            this.last_page = this.last_page - 1;
          }
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    }
  }

  findNext(value: any) {
    if (value) {
      this.count = value * 10 - 10;
      this.current_page = value + 1;
    }
    else if (this.count < this.total_count) {
      this.count = this.count + 10;
      console.log("count", this.count)
    }
    else {
      return
    }
    if (this.count < this.total_count) {
      this.spinnerService.show();
      this.hashtagservice.allHashtag(this.access_token, this.count)
        .then((data: any) => {
          console.log("data", data);
          this.spinnerService.hide()
          if (data.data.hashTags.length) {
            this.hashtags = data.data.hashTags;
            this.current_page = this.current_page + 1;
            this.last_page = this.last_page + 1;
          }
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    }
    else {
      this.count = this.count - 10;
    }
  }

  searchHashtag(event: any, data: any) {
    this.hashtags = [];
    this.hashtagservice.searchHashtag(data, this.access_token)
      .then((data: any) => {
        console.log("data", data);
        this.spinnerService.hide()
        this.hashtags.push(data);
        console.log(this.hashtags)
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
  }

  deleteHashtag(id, index: any) {
    var choice = confirm('Do you really want to delete this record?');
    if (choice === true) {
      console.log(id)
      this.spinnerService.show();
      let index = this.hashtags.findIndex(x => x._id == id);
      console.log(index)
      this.hashtagservice.deleteHashtag(id, this.access_token)
        .then((data: any) => {
          console.log(data, index)
          this.hashtags.splice(index, 1);
          console.log(this.hashtags)
          this.spinnerService.hide();
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    }
    return false
  }

  cancel() {
    this.hashtag_name = '';
    this.selectedCountry = '';
    this.selectedLanguage = ''

  }

  save() {
    if (!this.hashtag_name) {
      alert("Please enter hashtag name");
      return;
    }
    let obj = {
      name: '#' + this.hashtag_name,
      location: this.selectedCountry,
      language: this.selectedLanguage
    }
    this.spinnerService.show();
    console.log(obj)
    this.hashtagservice.createHashtag(obj, this.access_token)
      .then((data: any) => {
        this.spinnerService.hide()
        console.log("data", data, this.hashtags);
        this.hashtags.push(data);
        this.ref.detectChanges();
        this.hashtag_name = '';
        this.selectedCountry = '';
        this.selectedLanguage = ''
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });

  }

  viewPost(data: any) {
    window.localStorage.setItem('postdetails', JSON.stringify(data))
    this.router.navigate(['hashtags/hashtags-post']);

  }

}
