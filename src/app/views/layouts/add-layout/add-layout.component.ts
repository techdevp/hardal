import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-layout',
  templateUrl: './add-layout.component.html',
  styleUrls: ['./add-layout.component.scss']
})
export class AddLayoutComponent implements OnInit {

  table_data = [];
  files: any;
  image: any = [];
  constructor() { }

  ngOnInit() {
  }

  onFileSelect(event: any, i: any) {
    console.log(event)
    if (event.target.files.length) {
      let files = event.target.files;
      this.files = Array.prototype.slice.call(files);
      this.files.forEach((f: any, i: any) => {
        this.image[i] = files[i].name;
        console.log('image', this.image)
        var reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = (e: any) => {

        }
      });
    }
    else {
      alert('Choose stickers to proceed !');
    }
  }
}
