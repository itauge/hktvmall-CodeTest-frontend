import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpclientService} from "./services/httpclient.service";
import {FormGroup, FormControl} from '@angular/forms';
import { PageEvent} from "@angular/material/paginator";
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import * as moment from 'moment'; // add this 1 of 4

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
    let now = moment(); // add this 2 of 4
    console.log('hello world', now.format()); // add this 3 of 4
    console.log(now.add(7, 'days').format()); // add this 4of 4
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

  startDate:any='';
  endDate:any='';

  startEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    const momentDate = new Date(`${event.value}`); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    this.startDate = formattedDate;
  }

  endEvent(type: string, event: MatDatepickerInputEvent<Date>) {

    const momentDate = new Date(`${event.value}`); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    this.endDate = formattedDate;

    // this.events.push(`${event.value}`);
    // console.log(`${this.events[0]}`);

    this.service.getDataByDate(this.startDate,this.endDate).subscribe(
      (data:any)=> {
      this.data = data})
  }


  length=0;
  pageSize = 100;
  page = 0;
  pageSizeOptions: number[] = [10, 20, 30, 100 ];

//PageChange -> query
  onPageChange(pageEvent: PageEvent){
    this.page = pageEvent.pageIndex; //set the this page
    this.pageSize = pageEvent.pageSize; //set the size per page
    this.getNewData(); //query
  }

//query
  getNewData() {
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
