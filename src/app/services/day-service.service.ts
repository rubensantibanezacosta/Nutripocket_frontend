import { FoodService } from 'src/app/services/food.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Day } from '../models/day';
import * as moment from 'moment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class DayServiceService {
  token="";
  endpoint=environment.apiUrl+"/api/day";
  httpOptions :any;
  constructor(private httpClient: HttpClient, private tokenService:TokenService, private foodService: FoodService) { 
 
    this.getData().then(()=>{
      this.httpOptions={
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}` }
        )
      };
    });
  }


  async getData() {
    this.token = await this.tokenService.getData("NP_token");
  }


  createDay(day:Day):Observable<any>{
    return this.httpClient.post<any>(this.endpoint,JSON.stringify(day), this.httpOptions)
  }

  generateWeek():Observable<any>{
    return this.httpClient.get(this.endpoint+"/generateweek", this.httpOptions)
  }

  regenerateDay(date:Date):Observable<any>{
    return this.httpClient.get(this.endpoint+"/regenerateday/"+date, this.httpOptions)
  }

  findDayById(id:number):Observable<any>{
    return this.httpClient.get<any>(this.endpoint+"/id/"+id, this.httpOptions)
  }

  updateDay(id:number, day:Day):Observable<any>{
    return this.httpClient.put<any>(this.endpoint+"/"+id,JSON.stringify(day), this.httpOptions)
  }


  findDayByUserAndDate(date:Date){
    return this.httpClient.get<Day>(this.endpoint+"/date/"+moment(date).format(), this.httpOptions)
  }
}
