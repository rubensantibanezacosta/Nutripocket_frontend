import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token: string = "";
  endpoint = environment.apiUrl + "/api/auth";


  constructor(private httpClient: HttpClient, private router: Router, private tokenService: TokenService) {
    this.getData();
  }


  async getData() {
    this.token = await this.tokenService.getData("NP_token");
  }



  login(username: string, password: string): Observable<any> {
    let authorizationData = 'Basic ' + btoa(username + ':' + password);
    const httpOptionsBasic = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': authorizationData
      }),
    }
    return this.httpClient.post<any>(this.endpoint + "/sign-in", {}, httpOptionsBasic)

  }

  logout() {
    return this.tokenService.removeItem("NP_token")
  }

}
