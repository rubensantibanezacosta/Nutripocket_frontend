import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class EvolutionService {
  token: string = '';
  endpoint = environment.apiUrl + '/api/evolution';
  httpOptions: any;
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {
    this.getData().then(() => {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        }),
      };
    });
  }

  async getData() {
    this.token = await this.tokenService.getData('NP_token');
  }

  getLastEvolution(): Observable<any> {
    return this.httpClient.get<any>(
      this.endpoint + '/byUserLast',
      this.httpOptions
    );
  }
}
