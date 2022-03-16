import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private storage: Storage) {
    this.init();
  }

  init() {
    this.storage.create();
  }

  async getData(dataName: string) {
    return this.storage.get(dataName);
  }

  async addData(dataName: string, item: string) {
    return this.storage.set(dataName, item);
  }

  async removeItem(dataName: string) {
    const storedData = await this.storage.get(dataName);
    return this.storage.remove(dataName);
  }

  /*   getDecodedAccessToken(): any {
      try{
          return jwt_decode(this.token);
      }
      catch(Error){
          return null;
      }
    } */
}
