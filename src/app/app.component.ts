import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpclientService} from "./services/httpclient.service";
import {FormGroup, FormControl} from '@angular/forms';
import { PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'hktvmall-codeTest-frontend';

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private service: HttpclientService) {
  }


  displayedColumns: string[] = ['UID','Start Date', 'End Date', 'Summary' ];

  data:any=[];


  //get the data from backend api
  ngOnInit(): void {
    this.service.getData(BigInt(100),BigInt(0)).subscribe((data: any) =>
    {
      console.warn(data);
      this.data = data;
    })
  }


  length=0;
  pageSize = 100;
  page = 0;
  pageSizeOptions: number[] = [10, 20, 30, 100 ];

//PageChange -> query
  onPageChange(pageEvent: PageEvent){
    this.page = pageEvent.pageIndex; //set the this page
    this.pageSize = pageEvent.pageSize; //set the size per page
    this.getDevice(); //query
  }

//query
  getDevice() {
    const filter={
      'pagenum':this.page,
      'pagesize':this.pageSize
    };
    this.service.getData(BigInt(filter.pagesize),BigInt(filter.pagenum)).subscribe(
      (data:any)=>{
        this.data = data;
        this.length = data.totalElements;
      }
    );
  }

}
