import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  token:string=""; 
  endpoint=environment.apiUrl+"/api/item";
  httpOptions:any;
  constructor(private httpClient: HttpClient,  private tokenService:TokenService) { 
    
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




  createItem(item:Item):Observable<any>{
    return this.httpClient.post<any>(this.endpoint,JSON.stringify(item),this.httpOptions)
  }

  regenerateItemsOfDish(dishid:number,foodofday:number):Observable<any>{
    
    return this.httpClient.get(
      this.endpoint+"/regenerate/"+dishid+"/"+foodofday,
      this.httpOptions)
  }

  updateItem(id:number, item:Item):Observable<any>{
    return this.httpClient.put(this.endpoint+"/"+id, JSON.stringify(item), this.httpOptions)
  }

  deleteItem(id:number){
    return this.httpClient.delete(this.endpoint+"/"+id, this.httpOptions)
  }

}
