import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Week } from '../models/week';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeekService {
endpoint="";
httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
  'Authorization': `Bearer ${""}` }
  )
};

  constructor(private httpClient: HttpClient) { }

  createweek(week:Week):Observable<Week>{
    return this.httpClient.post<Week>(this.endpoint,JSON.stringify(week), this.httpOptions)
  }
  findWeekById(){

  }
  findLastWeekByUser(){

  }
  findWeekByDateBetweenAndUser(){

  }
  

}
