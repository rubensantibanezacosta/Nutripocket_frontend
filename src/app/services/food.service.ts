import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Food } from '../models/food';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  endpoint = environment.apiUrl + "/api/food";
  httpOptions: any;
  constructor(private httpClient: HttpClient, private tokenService: TokenService) {
    this.getData().then(async (token) => {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await token}`
        }
        )
      };
    });
  }

  async getData() {
    return await this.tokenService.getData("NP_token");
  }


  getFoods(foodName: string): Observable<any> {
    return this.httpClient.get(this.endpoint + "/name/" + foodName, this.httpOptions)
  }

  getFoodById(id: number): Observable<any> {
    return this.httpClient.get(this.endpoint + "/" + id, this.httpOptions)
  }

  createFood(food: Food): Observable<any> {
    console.log(food)
    return this.httpClient.post(this.endpoint,JSON.stringify(food), this.httpOptions)
  }
}
