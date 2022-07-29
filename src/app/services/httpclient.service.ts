import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {Holiday} from "../holiday";

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  constructor(public http: HttpClient) { }

  getData(pagesize: BigInt,pagenum: BigInt){
    const api = 'http://127.0.0.1:8080/alldata' + '?pagesize=' + pagesize + '&pagenum=' + pagenum;
    return this.http.get(api);
  }

}
