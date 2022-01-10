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
    }).catch((error)=>{
      console.error(error);
    });
  
  }


  async getData() {
    this.token = await this.tokenService.getData("NP_token");
  }




/*   createItem(item:Item):Observable<any>{
    return this.httpClient.post<any>(this.endpoint,JSON.stringify(item),this.httpOptions)
  }
 */

  createItems(items:Item[], dishid):Observable<any>{
    let itemsToSend=[];
    items.forEach((item)=>{
      let preparedItem={
        dishid:dishid,
        foodid:item.food.id,
        dosex:item.dosex,
      }
      itemsToSend.push(preparedItem);
    })
   
    return this.httpClient.post<any>(this.endpoint+"/multiple",JSON.stringify(itemsToSend),this.httpOptions)
  }

  regenerateItemsOfDish(dishid:number,foodofday:number):Observable<any>{
    
    return this.httpClient.get(
      this.endpoint+"/regenerate/"+dishid+"/"+foodofday,
      this.httpOptions)
  }

  updateItem(id:number, item:Item, dishid):Observable<any>{
    let itemToSend=item;
    itemToSend.dishid=dishid;
    console.log(id);
    console.log(itemToSend);
    return this.httpClient.put(this.endpoint+"/"+id, JSON.stringify(itemToSend), this.httpOptions)
  }

  deleteItem(id:number){
    return this.httpClient.delete(this.endpoint+"/"+id, this.httpOptions)
  }

}
